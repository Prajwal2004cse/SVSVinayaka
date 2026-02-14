const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../config/db");


// Storage setup
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, "poster_" + Date.now() + path.extname(file.originalname));
  }

});

const upload = multer({ storage });


// Upload poster
router.post("/upload", upload.single("image"), (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        msg: "No file uploaded"
      });
    }

    const image = req.file.filename;

    const sql = "INSERT INTO poster (image) VALUES (?)";

    db.query(sql, [image], (err, result) => {

      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({
          msg: "Database error",
          error: err
        });
      }

      res.json({
        msg: "Poster uploaded successfully",
        image
      });

    });

  } catch (error) {

    console.error("SERVER ERROR:", error);

    res.status(500).json({
      msg: "Server error",
      error
    });

  }

});


// Get latest poster
router.get("/latest", (req, res) => {

  const sql =
    "SELECT * FROM poster ORDER BY created_at DESC LIMIT 1";

  db.query(sql, (err, result) => {

    if (err) return res.status(500).json(err);

    if (result.length === 0)
      return res.json(null);

    res.json(result[0]);

  });

});


module.exports = router;
