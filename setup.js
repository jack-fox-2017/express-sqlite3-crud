const Sql = require('sqlite3').verbose();
let db = new Sql.Database('./db/data.db');

function createTbContacts(){
  db.run(`CREATE TABLE IF NOT EXISTS CONTACTS
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(25), company VARCHAR(25), telp_number VARCHAR(25), email VARCHAR(25))`,
    err => {
      if(err){
        throw err;
      }
      console.log('table contacts created!');
  });
}

function createTbGroups(){
  db.run(`CREATE TABLE IF NOT EXISTS GROUPS
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(25))`,
    err =>{
      if(err){
        throw err;
      }
      console.log('table groups created!');
  });
}

function createTbAddress(){
  db.run(`CREATE TABLE IF NOT EXISTS ADDRESSES
    (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(50), city VARCHAR(25), state VARCHAR(25), country VARCHAR(25), post_code VARCHAR(7))`,
    err =>{
      if(err){
        throw err;
      }
      console.log('table addresses created!');
  });
}

function createTbProfiles(){
  db.run(`CREATE TABLE IF NOT EXISTS PROFILES
    (id INTEGER PRIMARY KEY AUTOINCREMENT, date_of_birth VARCHAR(10), age VARCHAR(3), hobby VARCHAR(50))`,
    err=>{
      if(err){
        throw err;
      }
      console.log('table profiles created!');
  });
}

createTbContacts();
createTbGroups();
createTbAddress();
createTbProfiles();
