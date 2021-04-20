var mysql = require('mysql');
var pool = "";
// const environment = process.env.NODE_ENV || 'dev';

pool = mysql.createPool({
  connectionLimit: 100,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'pokemon',
  debug: true
});
module.exports = pool;
