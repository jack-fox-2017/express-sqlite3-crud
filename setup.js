'use strict'

const sql = require('sqlite3')
const db = new sql.Database('./db/data.db')

function createTableContacts() {
  db.run(`CREATE TABLE IF NOT EXISTS contacts(id integer primary key autoincrement, name text, company text, telp_number integer, email text)`);
  console.log('Contacts Created');
}

function createTableGroups() {
  db.run(` CREATE TABLE IF NOT EXISTS groups(id integer primary key autoincrement, name_of_groups text) `);
  console.log('Groups Created');
}

function createtableAddress() {
  db.run(`CREATE TABLE IF NOT EXISTS address(id integer primary key autoincrement, street text, city text, zip_code text)`);
  console.log('Address Created');
}

function createTableProfiles() {
  db.run(`CREATE TABLE IF NOT EXISTS profiles(id integer primary key autoincrement, username text, password text)`);
  console.log('Profile Created');
}

createTableContacts()
createTableGroups()
createtableAddress()
createTableProfiles()
