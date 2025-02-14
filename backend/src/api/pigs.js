const express = require('express');
const router = express.Router();
const path = require("path");
const pool = require("../config/db");


// API endpoint to fetch pigs data
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pigs');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching pigs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;