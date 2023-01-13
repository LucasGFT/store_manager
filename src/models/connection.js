const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
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
