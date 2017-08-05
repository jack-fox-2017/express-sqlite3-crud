"use strict"

const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set("view engine","ejs")

app.get('/',(req,res) => {
  res.render('index',{})
})



//*************************************Contacts******************************************

app.get('/contacts',(req,res) => {
  db.all(`SELECT*FROM Contacts`,(err,rows) => {
  res.render('contacts',{data:rows})
  })
})

app.post('/contacts',(req,res) => {
  db.run(`INSERT INTO Contacts(name,company,telp_number,email) VALUES ('${req.body.Name}','${req.body.Company}','${req.body.Telp_number}','${req.body.Email}')`)
  res.redirect('/contacts')
})

app.get('/contacts/editContacts/:id',(req,res) => {
  db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id}`,(err,rows) => {
    if (!err) {
      res.render('editContacts',{data:rows})
    }
  })
})

app.post('/contacts/editContacts/:id',(req,res) => {
  db.run(`UPDATE Contacts SET name = '${req.body.Name}',company = '${req.body.Company}',telp_number = '${req.body.Telp_number}',email = '${req.body.Email}' WHERE id = ${req.params.id}`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id',(req,res) => {
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`)
  res.redirect('/contacts')
})

//***************************************groups**********************************

app.get('/groups',(req,res) => {
  db.all(`SELECT * FROM Groups`,(err,rows) => {
    if(!err){
      res.render('groups',{data:rows})
    }
  })
})

app.post('/groups',(req,res) => {
  db.run(`INSERT INTO Groups(name_of_group) VALUES ('${req.body.name_of_group}')`)
  res.redirect('groups')
})

app.get('/groups/editGroups/:id',(req,res) => {
  db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`,(err,rows) => {
    if(!err){
      res.render('editGroups',{data:rows})
      // res.send('masuk ga edit grupiso')
    }
  })
})

app.post('/groups/editGroups/:id',(req,res) => {
  db.run(`UPDATE Groups SET name_of_group = '${req.body.Name}' WHERE id = ${req.params.id}`)
  res.redirect('/groups')
})

app.get('/groups/delete/:id',(req,res) =>{
  db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`)
  res.redirect('/groups')
})

//**************************************************addresses********************************************

app.get('/addresses',(req,res) => {
  db.all(`SELECT * FROM Addresses`, (err,rows) => {
    res.render('addresses',{data:rows})
  })
})

app.post('/addresses',(req,res) => {
  db.run(`INSERT INTO Addresses(street,city,zipcode) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}')`)
  res.redirect('/addresses')
})

app.get('/addresses/editAddresses/:id',(req,res) => {
  db.all(`SELECT * FROM Addresses WHERE id = ${req.params.id}`,(err,rows) => {
    res.render('editAddresses',{data:rows})
  })
})

app.post('/addresses/editAddresses/:id',(req,res) => {
  db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}' , zipcode = '${req.body.zipcode}'WHERE id = ${req.params.id}`)
    res.redirect('/addresses')
})

app.get('/addresses/deleteAddresses/:id',(req,res) => {
  db.run(`DELETE FROM Addresses WHERE id = ${req.params.id}`)
  res.redirect('/addresses')
})

//**************************************************Profiles********************************************

app.get('/profiles',(req,res) => {
  db.all(`SELECT * FROM Profiles`,(err,rows) => {
    res.render('profiles',{data:rows})
  })
})

app.post('/profiles',(req,res) => {
  db.run(`INSERT INTO Profiles (username,password) VALUES ('${req.body.username}','${req.body.password}')`)
    res.redirect('/profiles')
})

app.get('/profiles/editProfiles/:id',(req,res) => {
  db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id}`,(err,rows) => {
    res.render('editProfiles',{data:rows})
  // res.send('masuk ga')
  })
})

app.post('/profiles/editProfiles/:id',(req,res) => {
  db.run(`UPDATE Profiles SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${req.params.id}`)
  res.redirect('/profiles')
})

app.get('/profiles/deleteProfiles/:id',(req,res) => {
  db.run(`DELETE FROM Profiles WHERE id = ${req.params.id}`)
  res.redirect('/profiles')
})

app.listen(3000,function(){
  console.log("im listen 3000");
})
