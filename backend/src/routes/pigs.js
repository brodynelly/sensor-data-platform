const express = require("express");
const router = express.Router();
const { getPigs, addPig } = require("../controllers/pigController");

router.get("/", getPigs);
router.post("/", addPig);

module.exports = router;
