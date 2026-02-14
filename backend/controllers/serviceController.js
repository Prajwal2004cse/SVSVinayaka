const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// ===============================
// Add Service (With Image)
// ===============================
exports.addService = (req, res) => {
  const { name, description, category, fee, time_required } = req.body;

  // If image uploaded
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
    INSERT INTO services 
    (name, description, category, fee, time_required, image) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, category, fee, time_required, image],
    (err, result) => {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).json(err);
      }

      res.json({
        msg: "Service added successfully",
        image,
      });
    }
  );
};

// ===============================
// Get All Services
// ===============================
exports.getServices = (req, res) => {
  db.query("SELECT * FROM services ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// ===============================
// Update Service (Optional Image)
// ===============================
exports.updateService = (req, res) => {
  const { id } = req.params;
  const { name, description, category, fee, time_required } = req.body;

  // If new image uploaded
  const newImage = req.file ? `/uploads/${req.file.filename}` : null;

  // Get old image first
  db.query("SELECT image FROM services WHERE id=?", [id], (err, rows) => {
    if (err) return res.status(500).json(err);

    const oldImage = rows[0]?.image;

    let sql;
    let values;

    if (newImage) {
      // Delete old image file
      if (oldImage) {
        const filePath = path.join(__dirname, "..", oldImage);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      sql = `
        UPDATE services 
        SET name=?, description=?, category=?, fee=?, time_required=?, image=? 
        WHERE id=?
      `;

      values = [
        name,
        description,
        category,
        fee,
        time_required,
        newImage,
        id,
      ];
    } else {
      sql = `
        UPDATE services 
        SET name=?, description=?, category=?, fee=?, time_required=? 
        WHERE id=?
      `;

      values = [name, description, category, fee, time_required, id];
    }

    db.query(sql, values, (err) => {
      if (err) return res.status(500).json(err);

      res.json({ msg: "Service updated successfully" });
    });
  });
};

// ===============================
// Delete Service (With Image)
// ===============================
exports.deleteService = (req, res) => {
  const { id } = req.params;

  // Get image first
  db.query("SELECT image FROM services WHERE id=?", [id], (err, rows) => {
    if (err) return res.status(500).json(err);

    const image = rows[0]?.image;

    // Delete DB row
    db.query("DELETE FROM services WHERE id=?", [id], (err) => {
      if (err) return res.status(500).json(err);

      // Delete image file
      if (image) {
        const filePath = path.join(__dirname, "..", image);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      res.json({ msg: "Service deleted successfully" });
    });
  });
};
