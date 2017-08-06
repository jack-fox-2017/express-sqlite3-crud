var sqlite3 = require("sqlite3").verbose()
var db = new sqlite3.Database("./Database/data.db")

function createContac(){
  db.run(`CREATE TABLE IF NOT EXISTS cities(no INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, phonenumber INT, email text)`)
  //check apakah tabel berhasil di buat
  console.log("tabel berhasil di buat")
}

function createGroup(){
  db.run(`CREATE TABLE IF NOT EXISTS groups(no INTEGER PRIMARY KEY AUTOINCREMENT, namegroup text)`)
  console.log("data berhasil masuk ke tabel")
}

function createAddrees(){
  db.run(`CREATE TABLE IF NOT EXISTS address(no INTEGER PRIMARY KEY AUTOINCREMENT, address text, city text, province text, postcode INT)`)
  console.log("data berhasil masuk ke tabel")
}

function createProfile(){
  db.run(`CREATE TABLE IF NOT EXISTS profiles(no INTEGER PRIMARY KEY AUTOINCREMENT, username text, password text)`)
  console.log("data berhasil masuk ke tabel")
}


function insert(){
  db.run(`INSERT INTO groups (namegroup) VALUES("dimas")`)
  console.log("masuk");
}



// createContac()
//createGroup()
//insert()
//createAddrees()
//createProfile()
