const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Save Lead
router.post("/", (req, res) => {

  const { page } = req.body;

  if (!page) {
    return res.status(400).json({ message: "Page required" });
  }

  db.query(
    "INSERT INTO leads (page) VALUES (?)",
    [page],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB error" });
      }

      res.json({ message: "Lead saved" });
    }
  );
});

// Get All Leads
router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM leads ORDER BY created_at DESC",
    (err, results) => {

      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB error" });
      }

      res.json(results);
    }
  );

});


module.exports = router;
