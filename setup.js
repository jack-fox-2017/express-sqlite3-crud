'use strict'

const sql = require('sqlite3')
const db = new sql.Database('./db/data.db')

function createTableContacts() {
  db.run(`CREATE TABLE IF NOT EXISTS contacs(id integer primary key autoincrement, name text, company text, telp_number integer, email text)`);
  console.log('Contacts Created');
}

function createtableGroups() {
  db.run(` CREATE TABLE IF NOT EXISTS groups(id integer primary key autoincrement, name_of_groups text) `);
  console.log('Groups Created');
}

createTableContacts()
createtableGroups()
