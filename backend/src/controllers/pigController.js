const pool = require("../config/db");

const getPigs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pigs");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const addPig = async (req, res) => {
  const { pig_id, breed, age } = req.body;
  try {
    await pool.query("INSERT INTO pigs (pig_id, breed, age) VALUES (, , )", [pig_id, breed, age]);
    res.status(201).send("Pig added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { getPigs, addPig };
