'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');
const express = require('express');
const app = express.Router();

app.get('/', function(req, res){
  db.all(`SELECT * FROM Addresses`, function (err, rows) {
    if(!err) {
      res.render('address', {data: rows});
    }
  })
});

app.post('/', function(req,res) {
  db.run(`INSERT INTO Addresses (
    street,
    city,
    zip_code
  ) VALUES ('${req.body.street}','${req.body.city}', '${req.body.zip_code}')`);
  res.redirect('/addresses');
})


app.get('/edit/:id', function(req, res){
  db.all(`SELECT * FROM Addresses WHERE id = ${req.params.id}`, function (err, rows) {
    if(!err) {
      res.render('addressEdit', {data: rows});
    }
  })
})

app.post('/edit/:id', function(req, res){
  db.run(`UPDATE Addresses SET
    street = '${req.body.street}',
    city = '${req.body.city}',
    zip_code = '${req.body.zip_code}'
    WHERE id = '${req.params.id}';`);
  res.redirect('/addresses');
})

app.get('/delete/:id', function(req, res){
  db.run(`DELETE FROM Addresses WHERE id = ${req.params.id}`);
  res.redirect('/addresses');
});

module.exports = app;
