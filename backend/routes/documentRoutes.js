const express = require("express");
const router = express.Router();

const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");


// ---------------- ADD DOCUMENT ----------------
router.post("/", verifyToken, async (req, res) => {

  const { service_id, document_name } = req.body;

  if (!service_id || !document_name) {
    return res.status(400).json({
      message: "Service ID and document name required",
    });
  }

  try {

    await db.promise().query(
      "INSERT INTO service_documents (service_id, document_name) VALUES (?,?)",
      [service_id, document_name]
    );

    res.json({
      message: "Document added successfully",
    });

  } catch (err) {

    console.error("Add doc error:", err);

    res.status(500).json({
      message: "Failed to add document",
    });
  }
});



// ---------------- GET DOCUMENTS ----------------
router.get("/:id", async (req, res) => {

  try {

    const [rows] = await db.promise().query(
      "SELECT * FROM service_documents WHERE service_id = ?",
      [req.params.id]
    );

    res.json(rows);

  } catch (err) {

    console.error("Load docs error:", err);

    res.status(500).json({
      message: "Failed to load documents",
    });

  }

});  



// ---------------- DELETE DOCUMENT ----------------
router.delete("/:id", verifyToken, async (req, res) => {

  const docId = req.params.id;

  try {

    const [result] = await db.promise().query(
      "DELETE FROM service_documents WHERE id = ?",
      [docId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.json({
      message: "Document deleted successfully",
    });

  } catch (err) {

    console.error("Delete doc error:", err);

    res.status(500).json({
      message: "Failed to delete document",
    });
  }
});



module.exports = router;
