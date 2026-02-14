const db = require("../config/db");


// ✅ Upload Poster
exports.uploadPoster = (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded"
      });
    }

    const image = req.file.filename;

    const sql =
      "INSERT INTO posters (image) VALUES (?)";

    db.query(sql, [image], (err, result) => {

      if (err) {

        console.error("DB ERROR:", err);

        return res.status(500).json({
          error: "Database error"
        });

      }

      res.json({
        message: "Poster uploaded successfully",
        image: image
      });

    });

  } catch (err) {

    console.error("UPLOAD ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

};



// ✅ Get latest poster
exports.getLatestPoster = (req, res) => {

  const sql =
    "SELECT * FROM posters ORDER BY id DESC LIMIT 1";

  db.query(sql, (err, result) => {

    if (err) {

      console.error(err);

      return res.status(500).json({
        error: "Database error"
      });

    }

    if (result.length === 0) {
      return res.json(null);
    }

    res.json(result[0]);

  });

};
