let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/contactgroup.db');

function createTable(){
  db.run('CREATE TABLE CONTACTS(id INT, name VARCHAR(50), company VARCHAR(50), telp_number VARCHAR(50), email VARCHAR(50))')
  console.log('Tabel contacts berhasil dibuat');

  db.run('CREATE TABLE GROUPS(id INT, name_of_group VARCHAR(50))')
  console.log('Tabel groups berhasil dibuat');
}


createTable()
