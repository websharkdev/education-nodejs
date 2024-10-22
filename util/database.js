const mysql = require('mysql2')

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "Mm,Vwv2$hm7Tpp3Rhj8G",
});


module.exports = pool.promise()