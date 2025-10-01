const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect immediately (optional)
connection.connect((err) => {
  if (err) console.log("DB connection failed:", err);
  else console.log("DB connected successfully");
});

// Export the connection object
module.exports = connection;
