var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

function createTableContacts() {
  db.run(`CREATE TABLE IF NOT EXISTS contacts
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT);`);

  console.log("Table contacts created");

  db.run(`CREATE TABLE IF NOT EXISTS groups
          (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT);`);

  console.log("Table groups created");
}

function createTableAddress(){
db.run(`CREATE TABLE IF NOT EXISTS address
        (id INTEGER PRIMARY KEY AUTOINCREMENT, postal_code INTEGER, street TEXT, city TEXT);`);
console.log("Table address berhasil di buat");
}

function createTableProfiles(){
  db.run(`CREATE TABLE IF NOT EXISTS profiles
          (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT);`);
  console.log("Table profiles berhasil di buat");
}



createTableProfiles()
