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

// Import the pigs routes
const postureRouter = require("./api/posture");
const uploadZip = require("./api/upload");
const pigsRoutes = require('./api/pigs');


// use the pig routes in your app
app.use('/api/pigs', pigsRoutes);
app.use("/api/upload", uploadZip);
app.use("/api/posture", postureRouter);

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
