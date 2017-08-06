var sqlite3 = require("sqlite3").verbose()
var db = new sqlite3.Database("./Database/data.db")

function createTable(){
  db.run(`CREATE TABLE address (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR,city VARCHAR)`)
  // check apakah tabel berhasil di buat
  console.log("tabel berhasil di buat");
}

function insertTable(){
  db.run(`INSERT INTO address(street, city) VALUES ("bp2ip", "pakuhaji")`)

  console.log("data ke dua berhasil masuk ke tabel");
}

// createTable();
insertTable()
//id type integer, name type string, company type string, telp_number type string, email type string
