const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Controllers
const {
  addService,
  getServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const verifyToken = require("../middleware/authMiddleware");

// =======================
// Routes
// =======================

// ✅ Admin Protected (With Image Upload)
router.post(
  "/",
  verifyToken,
  upload.single("image"), // 👈 THIS IS IMPORTANT
  addService
);

router.put("/:id", verifyToken, updateService);
router.delete("/:id", verifyToken, deleteService);

// ✅ Public
router.get("/", getServices);

module.exports = router;
