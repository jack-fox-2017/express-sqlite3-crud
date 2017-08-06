'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');
const express = require('express');
const app = express.Router();

app.get('/', function(req, res){
  db.all(`SELECT * FROM Contacts`, function (err, rows) {
    if(!err) {
      res.render('contact', {data: rows});
    }
  })
});

app.post('/', function(req,res) {
  db.run(`INSERT INTO Contacts (
    name,
    company,
    telp_number,
    email
  ) VALUES ('${req.body.name}','${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`);
  res.redirect('/contacts');
})


app.get('/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, function (err, rows) {
    if(!err) {
      res.render('contactEdit', {data: rows});
    }
  })
})

app.post('/edit/:id', function(req, res){
  db.run(`UPDATE Contacts SET
    name = '${req.body.name}',
    company = '${req.body.company}',
    telp_number = '${req.body.telp_number}',
    email = '${req.body.email}'
    WHERE id = '${req.params.id}';`);
  res.redirect('/contacts');
})

app.get('/delete/:id', function(req, res){
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`);
  res.redirect('/contacts');
});

module.exports = app;
