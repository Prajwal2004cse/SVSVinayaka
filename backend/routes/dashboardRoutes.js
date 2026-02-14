const express = require("express");
const router = express.Router();

const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");

// Protected dashboard route
router.get("/", verifyToken, async (req, res) => {

  try {

    const [services] = await db.promise().query(
      "SELECT COUNT(*) AS total FROM services"
    );

    const [documents] = await db.promise().query(
      "SELECT COUNT(*) AS total FROM service_documents"
    );

    const [leads] = await db.promise().query(
      "SELECT COUNT(*) AS total FROM leads"
    );

    const [popular] = await db.promise().query(
      `SELECT page, COUNT(*) AS count
       FROM leads
       GROUP BY page
       ORDER BY count DESC
       LIMIT 1`
    );

    res.json({
      services: services[0].total,
      documents: documents[0].total,
      leads: leads[0].total,
      popular: popular.length ? popular[0].page : "N/A",
    });

  } catch (err) {

    console.error("Dashboard Error:", err);

    res.status(500).json({
      message: "Dashboard server error",
    });
  }
});

module.exports = router;
