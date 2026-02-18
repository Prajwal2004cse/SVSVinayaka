const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// ===============================
// Add Service (With Image)
// ===============================
exports.addService = (req, res) => {
  try {
    const { name, description, category, fee, time_required } = req.body;

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
          console.error("❌ Insert Service Error:", err);
          return res.status(500).json({
            success: false,
            message: "Failed to add service",
            error: err.message,
          });
        }

        res.status(201).json({
          success: true,
          message: "Service added successfully",
          image,
        });
      }
    );
  } catch (error) {
    console.error("❌ Add Service Catch Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ===============================
// Get All Services
// ===============================
exports.getServices = (req, res) => {
  try {
    const sql = "SELECT * FROM services ORDER BY id DESC";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("❌ Fetch Services Error:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch services",
          error: err.message,
        });
      }

      res.status(200).json({
        success: true,
        count: result.length,
        data: result,
      });
    });
  } catch (error) {
    console.error("❌ Get Services Catch Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ===============================
// Update Service
// ===============================
exports.updateService = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, fee, time_required } = req.body;

    const newImage = req.file ? `/uploads/${req.file.filename}` : null;

    db.query(
      "SELECT image FROM services WHERE id=?",
      [id],
      (err, rows) => {
        if (err) {
          console.error("❌ Fetch Old Image Error:", err);
          return res.status(500).json({
            success: false,
            message: "Failed to fetch service",
            error: err.message,
          });
        }

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
          if (err) {
            console.error("❌ Update Service Error:", err);
            return res.status(500).json({
              success: false,
              message: "Failed to update service",
              error: err.message,
            });
          }

          res.json({
            success: true,
            message: "Service updated successfully",
          });
        });
      }
    );
  } catch (error) {
    console.error("❌ Update Service Catch Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ===============================
// Delete Service
// ===============================
exports.deleteService = (req, res) => {
  try {
    const { id } = req.params;

    db.query(
      "SELECT image FROM services WHERE id=?",
      [id],
      (err, rows) => {
        if (err) {
          console.error("❌ Fetch Service Error:", err);
          return res.status(500).json({
            success: false,
            message: "Failed to fetch service",
            error: err.message,
          });
        }

        const image = rows[0]?.image;

        db.query("DELETE FROM services WHERE id=?", [id], (err) => {
          if (err) {
            console.error("❌ Delete Service Error:", err);
            return res.status(500).json({
              success: false,
              message: "Failed to delete service",
              error: err.message,
            });
          }

          // Delete image file
          if (image) {
            const filePath = path.join(__dirname, "..", image);

            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }

          res.json({
            success: true,
            message: "Service deleted successfully",
          });
        });
      }
    );
  } catch (error) {
    console.error("❌ Delete Service Catch Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
