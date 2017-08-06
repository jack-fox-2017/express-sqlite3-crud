'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');
const express = require('express');
const app = express.Router();

app.get('/', function(req, res){
  db.all(`SELECT * FROM Profiles`, function (err, rows) {
    if(!err) {
      res.render('profile', {data: rows});
    }
  })
});

app.post('/', function(req,res) {
  db.run(`INSERT INTO Profiles (
    username,
    password
  ) VALUES ('${req.body.username}','${req.body.password}')`);
  res.redirect('/profiles');
})


app.get('/edit/:id', function(req, res){
  db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id}`, function (err, rows) {
    if(!err) {
      res.render('profileEdit', {data: rows});
    }
  })
})

app.post('/edit/:id', function(req, res){
  db.run(`UPDATE Profiles SET
    username = '${req.body.username}',
    password = '${req.body.password}'
    WHERE id = '${req.params.id}';`);
  res.redirect('/profiles');
})

app.get('/delete/:id', function(req, res){
  db.run(`DELETE FROM Profiles WHERE id = ${req.params.id}`);
  res.redirect('/profiles');
});

module.exports = app;
