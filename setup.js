var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/data.db')


// Contacts: id type integer, name type string, company type string, telp_number type string, email type string
// Groups: id type integer, name_of_group type string


function createTableContact(){
  db.run(`CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), company VARCHAR(50), telp_number VARCHAR(20), email VARCHAR(30))`)
}

function createTableGroup(){
  db.run(' CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(30))');
}

function createTableProfile(){
  db.run('CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), gender VARCHAR(10), born_date DATE, telp_number VARCHAR(20), company VARCHAR(50), email VARCHAR(30))');
}

function createTableAddresses(){
  db.run('CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, id_profile INTEGER, address VARCHAR(255), FOREIGN KEY (id_profile) REFERENCES profile(id))')
}

//Create table if not exists
createTableGroup()
createTableContact()
createTableProfile()
createTableAddresses()
