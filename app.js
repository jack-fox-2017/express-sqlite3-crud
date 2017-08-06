// Addresses

'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

// ========================================================
// HOME

app.get('/', function(req, res){
  res.render('index');
})

// ========================================================
// CONTACTS

app.get('/contacts', function(req, res){
  db.all(`SELECT * FROM Contacts`, function (err, rows) {
    if(!err) {
      res.render('contact', {data: rows});
    }
  })
});

app.post('/contacts', function(req,res) {
  db.run(`INSERT INTO Contacts (
    name,
    company,
    telp_number,
    email
  ) VALUES ('${req.body.name}','${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`);
  res.redirect('/contacts');
})


app.get('/contacts/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, function (err, rows) {
    if(!err) {
      res.render('contactEdit', {data: rows});
    }
  })
})

app.post('/contacts/edit/:id', function(req, res){
  db.run(`UPDATE Contacts SET
    name = '${req.body.name}',
    company = '${req.body.company}',
    telp_number = '${req.body.telp_number}',
    email = '${req.body.email}'
    WHERE id = '${req.params.id}';`);
  res.redirect('/contacts');
})

app.get('/contacts/delete/:id', function(req, res){
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`);
  res.redirect('/contacts');
});

// ========================================================
// GROUPS

app.get('/groups', function(req, res){
  db.all(`SELECT * FROM Groups`, function (err, rows) {
    if(!err) {
      res.render('group', {data: rows});
    }
  })
});

app.post('/groups', function(req,res) {
  db.run(`INSERT INTO Groups (
    name_of_group
  ) VALUES ('${req.body.name_of_group}')`);
  res.redirect('/groups');
})


app.get('/groups/edit/:id', function(req, res){
  db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`, function (err, rows) {
    if(!err) {
      res.render('groupEdit', {data: rows});
    }
  })
})

app.post('/groups/edit/:id', function(req, res){
  db.run(`UPDATE Groups SET
    name_of_group = '${req.body.name_of_group}'`);
  res.redirect('/groups');
})

app.get('/groups/delete/:id', function(req, res){
  db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`);
  res.redirect('/groups');
});

// ========================================================
// ADDRESSES

app.get('/addresses', function(req, res){
  db.all(`SELECT * FROM Addresses`, function (err, rows) {
    if(!err) {
      res.render('address', {data: rows});
    }
  })
});

app.post('/addresses', function(req,res) {
  db.run(`INSERT INTO Addresses (
    street,
    city,
    zip_code
  ) VALUES ('${req.body.street}','${req.body.city}', '${req.body.zip_code}')`);
  res.redirect('/addresses');
})


app.get('/addresses/edit/:id', function(req, res){
  db.all(`SELECT * FROM Addresses WHERE id = ${req.params.id}`, function (err, rows) {
    if(!err) {
      res.render('addressEdit', {data: rows});
    }
  })
})

app.post('/addresses/edit/:id', function(req, res){
  db.run(`UPDATE Addresses SET
    street = '${req.body.street}',
    city = '${req.body.city}',
    zip_code = '${req.body.zip_code}'
    WHERE id = '${req.params.id}';`);
  res.redirect('/addresses');
})

app.get('/addresses/delete/:id', function(req, res){
  db.run(`DELETE FROM Addresses WHERE id = ${req.params.id}`);
  res.redirect('/addresses');
});

// ========================================================
// PROFILES

app.get('/profiles', function(req, res){
  db.all(`SELECT * FROM Profiles`, function (err, rows) {
    if(!err) {
      res.render('profile', {data: rows});
    }
  })
});


app.post('/profiles', function(req,res) {
  db.run(`INSERT INTO Profiles (
    username,
    password
  ) VALUES ('${req.body.username}','${req.body.password}')`);
  res.redirect('/profiles');
})


app.get('/profiles/edit/:id', function(req, res){
  db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id}`, function (err, rows) {
    if(!err) {
      res.render('profileEdit', {data: rows});
    }
  })
})

app.post('/profiles/edit/:id', function(req, res){
  db.run(`UPDATE Profiles SET
    username = '${req.body.username}',
    password = '${req.body.password}'
    WHERE id = '${req.params.id}';`);
  res.redirect('/profiles');
})

app.get('/profiles/delete/:id', function(req, res){
  db.run(`DELETE FROM Profiles WHERE id = ${req.params.id}`);
  res.redirect('/profiles');
});

app.listen(3000);
