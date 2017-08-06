const Sql = require('sqlite3').verbose();
let db = new Sql.Database('./db/data.db');

function createTbContacts(){
  db.run(`CREATE TABLE IF NOT EXISTS CONTACTS
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(25), company VARCHAR(25), telp_number VARCHAR(25), email VARCHAR(25))`,
    err => {
      if(err){
        throw err;
        console.log('table contacts created!');
      }
  });
}

function createTbGroups(){
  db.run(`CREATE TABLE IF NOT EXISTS GROUPS
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(25))`,
    err =>{
      if(err){
        throw err;
        console.log('table groups created!');
      }
  });
}

createTbContacts();
createTbGroups();
