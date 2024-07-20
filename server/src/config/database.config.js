const mysql = require("mysql");

const pool = mysql.createPool({
  queueLimit: 10,
  host: "localhost",
  port: 3307,
  database: "e-commerce-database",
  password: "",
  user: "root",
});

module.exports = pool;
