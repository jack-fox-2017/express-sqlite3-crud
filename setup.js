const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/database.db')


function createTable() {
  db.run(`CREATE TABLE IF NOT EXISTS Data_Contact(id INTEGER primary key AUTOINCREMENT, name text, company text, telp_number INTEGER, email text);`)

}
console.log(createTable(), "tabel terbuat");

function createTable2() {
  db.run(`CREATE TABLE IF NOT EXISTS Data_Groups(id INTEGER primary key AUTOINCREMENT, groups text)`)
}
console.log(createTable2(), "tabel terbuat");

function createTable3() {
  db.run(`CREATE TABLE IF NOT EXISTS Data_Adresses(id INTEGER primary key AUTOINCREMENT, jalan text, kota string, provinsi string)`)
}
console.log(createTable3(), "tabel terbuat");

function createTable4(){
  db.run(`CREATE TABLE IF NOT EXISTS Data_Profiles (id INTEGER primary key AUTOINCREMENT, username TEXT, password TEXT, contact_id INTEGER)`)
}
console.log(createTable4(), "tabel terbuat");
