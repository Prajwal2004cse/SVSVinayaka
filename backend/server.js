const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const multer = require("multer");

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const leadRoutes = require("./routes/leadRoutes");
const documentRoutes = require("./routes/documentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const posterRoutes = require("./routes/posterRoutes");

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());
app.use("/api/poster", posterRoutes);
// Serve uploads folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ================= Routes =================
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/gallery", galleryRoutes);

// ================= Multer Setup =================
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }

});

const upload = multer({ storage });

// ================= Test Route =================
// app.get("/", (req, res) => {
//   res.send("Digital Seva Backend Running 🚀");
// });

app.get("/test", (req, res) => {
  res.json({ status: "Backend working" });
});


// ================= Start Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0",() => {
  console.log(`Server running on port , PORT`);
});
