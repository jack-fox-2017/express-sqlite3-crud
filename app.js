const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const app = express();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/database.db')
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

//================Kontak=================
//display all contact list
app.get("/home/contacts", function(req, res) {
  db.all(`SELECT * FROM Data_Contact`,function(err, rows){
    res.render("contacts", {data : rows})
  })
})

//display form isi Kontak
app.get("/home/contacts/add", function(req, res) {
  res.render("form")
})

//insert ke database
app.post("/home/contacts/add", function(req, res) {
  db.run(`INSERT INTO Data_Contact(name, company, telp_number, email) VALUES
  ("${req.body.name}","${req.body.company}","${req.body.telp})","${req.body.email}")`)
  res.redirect("/home/contacts")
})

//display database
app.get("/home/contacts/edit/:id",function(req, res) {
  db.all(`SELECT * FROM Data_Contact WHERE id = "${req.params.id}"`, function(err, db_Contact) {
    res.render("edit", {data : db_Contact})
  })
})
//insert hasil edit database
app.post("/home/contacts/edit/:id",function(req, res) {
  db.run(`UPDATE Data_Contact SET name = "${req.body.name}", company = "${req.body.company}", telp_number = "${req.body.telp}", email = "${req.body.email}" WHERE id = "${req.params.id}"`)
  res.redirect("/home/contacts")
})
//delete record
app.get("/home/contacts/delete/:id", function(req, res) {
  db.run(`DELETE FROM Data_Contact WHERE id = "${req.params.id}"`)
  res.redirect("/home/contacts")
})
//====================================


//============HOMEPAGE================

app.get("/home", function(req, res) {
  res.render("index")
})
app.get("/", function(req, res) {
  // res.render("index")
  res.redirect("/home")
})
//=====================================

//==============GROUPS=================

app.get("/home/groups",function(req, res) {
  db.all(`SELECT * FROM Data_Groups`,function(err, db_Groups) {
    res.render("groups",{ data_groups : db_Groups})
  })
})

app.get("/home/groups/add", function(req, res) {
  res.render("groups-form")
})

app.post("/home/groups/add",function(req, res) {
  db.run(`INSERT INTO Data_Groups(groups) VALUES ("${req.body.groups}")`)
  res.redirect("/home/groups")
})

app.get("/home/groups/edit/:id", function(req, res) {
  db.all(`SELECT * FROM Data_Groups WHERE id = "${req.params.id}"`, function(err, db_Groups) {
    res.render("groups-edit", {data_groups : db_Groups})
  })
})
app.post("/home/groups/edit/:id",function(req, res) {
  db.run(`UPDATE Data_Groups SET groups = "${req.body.groups}" WHERE id = "${req.params.id}"`)
  res.redirect("/home/groups")
})
app.get("/home/groups/delete/:id", function(req, res) {
  db.run(`DELETE FROM Data_Groups WHERE id = "${req.params.id}"`)
  res.redirect("/home/groups")
})
//=====================================

//==============Adresses===============

app.get("/home/adresses",function(req, res) {
  db.all(`SELECT * FROM Data_Adresses`,function(err, db_Adresses) {
    res.render("adresses",{ data_adresses : db_Adresses})
  })
})

app.get("/home/adresses/add", function(req, res) {
  res.render("adresses-form")
})

app.post("/home/adresses/add",function(req, res) {
  db.run(`INSERT INTO Data_Adresses(jalan, kota, provinsi) VALUES ("${req.body.jalan}", "${req.body.kota}", "${req.body.provinsi}")`)
  res.redirect("/home/adresses")
})

app.get("/home/adresses/edit/:id", function(req, res) {
  db.all(`SELECT * FROM Data_Adresses WHERE id = "${req.params.id}"`, function(err, db_Adresses) {
    res.render("adresses-edit", {data_adresses : db_Adresses})
  })
})
app.post("/home/adresses/edit/:id",function(req, res) {
  db.run(`UPDATE Data_Adresses SET jalan = "${req.body.jalan}", kota = "${req.body.kota}", provinsi = "${req.body.provinsi}" WHERE id = "${req.params.id}"`)
  res.redirect("/home/adresses")
})
app.get("/home/adresses/delete/:id", function(req, res) {
  db.run(`DELETE FROM Data_Adresses WHERE id = "${req.params.id}"`)
  res.redirect("/home/adresses")
})

//=====================================

//==============Adresses===============

app.get("/home/profiles",function(req, res) {
  db.all(`SELECT * FROM Data_Profiles`,function(err, db_Profiles) {
    res.render("profiles",{ data_profiles : db_Profiles})
  })
})

app.get("/home/profiles/add", function(req, res) {
  res.render("profiles-form")
})

app.post("/home/profiles/add",function(req, res) {
  db.run(`INSERT INTO Data_Profiles(username, password) VALUES ("${req.body.username}", "${req.body.password}")`)
  res.redirect("/home/profiles")
})

app.get("/home/profiles/edit/:id", function(req, res) {
  db.all(`SELECT * FROM Data_Profiles WHERE id = "${req.params.id}"`, function(err, db_Profiles) {
    res.render("profiles-edit", {data_profiles : db_Profiles})
  })
})
app.post("/home/profiles/edit/:id",function(req, res) {
  db.run(`UPDATE Data_Profiles SET username = "${req.body.username}", password = "${req.body.password}" WHERE id = "${req.params.id}"`)
  res.redirect("/home/profiles")
})
app.get("/home/profiles/delete/:id", function(req, res) {
  db.run(`DELETE FROM Data_Profiles WHERE id = "${req.params.id}"`)
  res.redirect("/home/profiles")
})


app.listen(3010);
