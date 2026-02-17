const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // IMPORTANT for Railway
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // FIXED name
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Required for Railway external connection
  },
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Failed:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

module.exports = db;
