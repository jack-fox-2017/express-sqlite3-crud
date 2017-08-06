var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/data.db')

function create_table() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,
      company TEXT, telp_number TEXT, email TEXT);`)

      db.run(`CREATE TABLE IF NOT EXISTS Groups
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT);`)

}

function insert_data() {
  db.run(`INSERT INTO Contacts(name,company,telp_number,email)
  VALUES ("MSrabbani", "Kaleng", "0856945940"," msrabbani@gmail.com");`)

// db.run(`INSERT INTO Groups(name_of_group)
// VALUES ("Kalengabret")`)
}


// create_table()
// insert_data()
