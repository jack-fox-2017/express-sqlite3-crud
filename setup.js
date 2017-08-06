const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')

var createTables = () => {
  db.run('CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, company VARCHAR, phone VARCHAR, email VARCHAR)')
  db.run('CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR)')
  db.run('CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR, city VARCHAR, Contacts_id INTEGER)')
  db.run('CREATE TABLE IF NOT EXISTS Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR, password VARCHAR, Contacts_id INTEGER)')
}

createTables()
