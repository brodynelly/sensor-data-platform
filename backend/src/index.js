const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const db = require("./config/db");
const AdmZip = require("adm-zip");


const app = express();
app.use(express.json());
app.use(cors());

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Test Route to Check Backend Connection
app.get("/", (req, res) => {
    res.json({ message: "Backend is running on port 3001!" });
});

// API endpoint to fetch pigs data
app.get('/api/pigs', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM pigs');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching pigs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

const uploadZip = require("./api/upload");
app.use("/api/upload", uploadZip);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
