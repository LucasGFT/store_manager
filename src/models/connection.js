require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// const connection = mysql.createPool({
//   host: process.env.MYSQL_HOST || 'localhost',
//   port: process.env.MYSQL_PORT || 33060,
//   user: 'root',
//   // environment:
//   // MYSQL_USER: root
//   password: 'root',
//   // MYSQL_PASSWORD: root
//   database: 'trybecardb',
//   // MYSQL_DATABASE: trybecardb

// });

module.exports = connection;
