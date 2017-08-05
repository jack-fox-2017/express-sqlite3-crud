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


createTable1()
createTable2()
