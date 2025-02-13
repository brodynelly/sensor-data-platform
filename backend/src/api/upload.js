const express = require("express");
const multer = require("multer");
const AdmZip = require("adm-zip");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Function to format timestamps
function formatTimestamp(rawTimestamp) {
  return rawTimestamp
    .replace(/_/g, "-")
    .replace(/-(\d{2})-(\d{2})-/, "-$1-$2 ")
    .replace(/-(\d{2})-(\d{2})$/, ":$1:$2");
}

// Extract Pig ID from the filename (expects something like "ID_123_")
function extractPigId(filename) {
  const match = filename.match(/ID_(\d+)_/);
  return match ? parseInt(match[1], 10) : null;
}

// Ensure pig exists or create it if necessary
async function ensurePigExists(pigId) {
  const result = await pool.query("SELECT pig_id FROM pigs WHERE pig_id = $1", [pigId]);

  if (result.rowCount === 0) {
    console.log(`Pig ID ${pigId} not found. Creating a new entry...`);
    const insertResult = await pool.query(
      `INSERT INTO pigs (pig_id, breed, in_heat, breeding_time, pregnant_check, farrowing_time)
       VALUES ($1, 'Unknown', false, NULL, false, NULL) RETURNING pig_id`,
      [pigId]
    );
    return insertResult.rows[0].pig_id;
  }
  return pigId;
}

// Batch size for SQL inserts
const BATCH_SIZE = 1000;

// Helper function to insert records in batches
async function insertRecords(records) {
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    // Build placeholders for each record in the batch.
    const placeholders = batch
      .map((_, idx) => `($${idx * 3 + 1}, $${idx * 3 + 2}, $${idx * 3 + 3})`)
      .join(",");
    const flatBatch = batch.flat();
    console.log(`Inserting batch ${i / BATCH_SIZE + 1} with ${batch.length} records.`);
    // Quote "timestamp" since it's a reserved word.
    const insertQuery = `INSERT INTO posture_data (pig_id, "timestamp", posture) VALUES ${placeholders}`;
    try {
      const result = await pool.query(insertQuery, flatBatch);
      console.log(`Batch inserted. Rows affected: ${result.rowCount}`);
    } catch (error) {
      console.error("Error inserting batch:", error);
      throw error;
    }
  }
}

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const zipPath = req.file.path;
  const extractDir = `uploads/${Date.now()}`;

  try {
    // Create extraction directory and extract ZIP contents
    fs.mkdirSync(extractDir, { recursive: true });
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractDir, true);
    console.log(`Extracted files to: ${extractDir}`);

    // Filter for CSV files only
    const files = fs.readdirSync(extractDir).filter(file => file.endsWith(".csv"));
    if (files.length === 0) {
      return res.status(400).json({ error: "No CSV files found in ZIP." });
    }

    let totalRecords = 0;

    // Process each CSV file concurrently
    await Promise.all(
      files.map(async (file) => {
        const pigId = extractPigId(file);
        if (!pigId) {
          console.warn(`Skipping file ${file}: No valid Pig ID`);
          return;
        }

        // Ensure the pig exists in the database
        await ensurePigExists(pigId);

        const filePath = path.join(extractDir, file);
        const records = [];

        // Process CSV file and accumulate valid records
        await new Promise((resolve, reject) => {
          fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
              // Log row data for debugging purposes
              console.log(`Row from ${file}:`, row);

              // Ensure header names match your CSV exactly.
              const rawTimestamp = row["Timestamp"];
              const rawPosture = row["Posture"];
              const timestamp = rawTimestamp ? formatTimestamp(rawTimestamp) : null;
              const parsedPosture = parseInt(rawPosture, 10);
              const posture = (!isNaN(parsedPosture)) ? parsedPosture : null;

              if (timestamp && posture !== null) {
                records.push([pigId, timestamp, posture]);
              }
            })
            .on("end", async () => {
              try {
                if (records.length > 0) {
                  await insertRecords(records);
                  totalRecords += records.length;
                  console.log(`Inserted ${records.length} records from file ${file}`);
                } else {
                  console.warn(`No valid records found in file ${file}`);
                }
                resolve();
              } catch (err) {
                console.error(`Error inserting records from file ${file}:`, err);
                reject(err);
              }
            })
            .on("error", (err) => {
              console.error(`Error reading file ${file}:`, err);
              reject(err);
            });
        });

        // Remove the processed CSV file
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn(`Failed to delete file ${filePath}:`, err.message);
        }
      })
    );

    // Cleanup: delete the ZIP file and extraction directory.
    try {
      fs.unlinkSync(zipPath);
    } catch (err) {
      console.warn(`Failed to delete zip file ${zipPath}:`, err.message);
    }
    try {
      fs.rmdirSync(extractDir, { recursive: true });
    } catch (err) {
      console.warn(`Failed to remove extraction directory ${extractDir}:`, err.message);
    }

    // Extra logging: query the database to confirm the number of inserted rows.
    try {
      const countResult = await pool.query("SELECT COUNT(*) FROM posture_data");
      console.log("Total rows in posture_data:", countResult.rows[0].count);
    } catch (err) {
      console.error("Error querying posture_data count:", err);
    }

    res.json({ message: `Uploaded ${totalRecords} records successfully!` });
  } catch (error) {
    console.error("Error processing ZIP:", error);
    res.status(500).json({ error: "Error processing ZIP file" });
  }
});

module.exports = router;