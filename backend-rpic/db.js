const mysql = require('mysql2');
require('dotenv').config(); 

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const promiseDb = db.promise();
module.exports = promiseDb;
