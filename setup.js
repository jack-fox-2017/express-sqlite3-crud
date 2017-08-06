var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/data.db')

function createTable1() {
  db.run(`CREATE TABLE IF NOT EXISTS
    Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT)`);
    console.log('Contacts table has been created');
}

function createTable2() {
  db.run(`CREATE TABLE IF NOT EXISTS
    Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)`);
    console.log('Groups table has been created');
}

function createTable3() {
  db.run(`CREATE TABLE IF NOT EXISTS
    Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, province TEXT, zip TEXT)`);
    console.log('Addresses table has been created');
}

function createTable4() {
  db.run(`CREATE TABLE IF NOT EXISTS
    Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)`);
    console.log('Profiles table has been created');
}


createTable1()
createTable2()
createTable3()
createTable4()
