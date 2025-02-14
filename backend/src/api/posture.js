const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Adjust if your db file is in a different path

// GET /api/posture -> returns rows from posture_data
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posture_data');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posture data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;