var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/data.db')

function create_table() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,
      company TEXT, telp_number TEXT, email TEXT);`)

      db.run(`CREATE TABLE IF NOT EXISTS Groups
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT);`)

        db.run(`CREATE TABLE IF NOT EXISTS Profiles
          (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT,city TEXT, zip_code INTEGER);`)

          db.run(`CREATE TABLE IF NOT EXISTS Addresses
            (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, telp_number INTEGER, email TEXT);`)

}

function insert_data() {
  // db.run(`INSERT INTO Contacts(name,company,telp_number,email)
  // VALUES ("MSrabbani", "Kaleng", "0856945940"," msrabbani@gmail.com");`)

  db.run(`INSERT INTO Profiles(street,city,zip_code)
  VALUES ("Jl.Siliwangi", "Sukabumi", "43112");`)

  // db.run(`INSERT INTO Addresses(name, telp_number, email)
  // VALUES ("siliwangi addresses", "0856782929", "asdasdada@sada.com");`)
// db.run(`INSERT INTO Groups(name_of_group)
// VALUES ("Kalengabret")`)
}


// create_table()
// insert_data()
