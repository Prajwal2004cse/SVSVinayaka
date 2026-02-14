const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");


// ===============================
// STORAGE CONFIG
// ===============================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {

    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1E9);

    cb(
      null,
      unique + path.extname(file.originalname)
    );
  }

});


// ===============================
// FILE FILTER
// ===============================

const fileFilter = (req, file, cb) => {

  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }

};


// ===============================
// MULTER
// ===============================

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});




// ===============================
// GET ALL IMAGES
// ===============================

router.get("/", (req, res) => {

  const sql =
    "SELECT * FROM gallery ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

});




// ===============================
// UPLOAD IMAGE (ADMIN)
// ===============================

router.post(
  "/",
  verifyToken,
  upload.single("image"),

  (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded"
        });
      }

      const imageUrl =
        "/uploads/" + req.file.filename;

      const sql =
        "INSERT INTO gallery (image_url) VALUES (?)";

      db.query(sql, [imageUrl], (err) => {

        if (err) {
          console.error("Insert Error:", err);
          return res.status(500).json(err);
        }

        res.json({
          message: "Upload success",
          image_url: imageUrl
        });

      });

    } catch (err) {

      console.error("Upload Crash:", err);

      res.status(500).json({
        message: "Upload failed"
      });

    }

  }

);




// ===============================
// DELETE IMAGE
// ===============================

router.delete("/:id", verifyToken, (req, res) => {

  const { id } = req.params;

  const sql =
    "DELETE FROM gallery WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Not found"
      });
    }

    res.json({ message: "Deleted" });

  });

});


module.exports = router;
