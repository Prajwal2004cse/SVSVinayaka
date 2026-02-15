const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const db = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const leadRoutes = require("./routes/leadRoutes");
const documentRoutes = require("./routes/documentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

// ✅ ADD THIS LINE
const posterRoutes = require("./routes/posterRoutes");

const app = express();


// ================= Middleware =================

app.use(cors());

app.use(express.json());


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

// ✅ ADD THIS LINE (VERY IMPORTANT)
app.use("/api/poster", posterRoutes);



// ================= Test Route =================

app.get("/", (req, res) => {

  res.send("Digital Seva Backend Running 🚀");

});


// ================= Start Server =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {

  console.log(`Server running on port ${PORT}`);

});
