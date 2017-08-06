var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');


function createTable(){
  db.run(`CREATE TABLE IF NOT EXISTS Contact(id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255), company varchar(255), telp_number varchar(12), email varchar(25) );`);
  console.log("Success Create Table Contact");
  db.run(`CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name_group varchar(25) );`);
  console.log("Success Create Table Groups");
}

module.exports = createTable();
