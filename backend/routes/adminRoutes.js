const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware"); // ✅ FIXED

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    msg: "Welcome Admin Dashboard",
    user: req.user,
  });
});

module.exports = router;
