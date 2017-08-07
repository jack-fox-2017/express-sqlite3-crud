const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database/data.db');

// function createTableContact() {
//   db.run(`CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, telp_number text, email text)`)
//   console.log("table contact created!");
// }
//
// function createTableGroup() {
//   db.run(`CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text)`)
//   console.log("table group created!");
// }
//
// function createTableAddress() {
//   db.run(`CREATE TABLE IF NOT EXISTS Address(id INTEGER PRIMARY KEY AUTOINCREMENT, group_name text, city text, province text, state text, zipcode text)`)
//   console.log("table address created!");
// }

function createTableProfile() {
  db.run(`CREATE TABLE IF NOT EXISTS Profiles(id INTEGER PRIMARY KEY AUTOINCREMENT, username text, password text)`)
  console.log("table profile created!");
}




// createTableContact()
// createTableGroup()
// createTableAddress()
createTableProfile()
