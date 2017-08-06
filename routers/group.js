'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');
const express = require('express');
const app = express.Router();

app.get('/', function(req, res){
  db.all(`SELECT * FROM Groups`, function (err, rows) {
    if(!err) {
      res.render('group', {data: rows});
    }
  })
});

app.post('/', function(req,res) {
  db.run(`INSERT INTO Groups (
    name_of_group
  ) VALUES ('${req.body.name_of_group}')`);
  res.redirect('/groups');
})


app.get('/edit/:id', function(req, res){
  db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`, function (err, rows) {
    if(!err) {
      res.render('groupEdit', {data: rows});
    }
  })
})

app.post('/edit/:id', function(req, res){
  db.run(`UPDATE Groups SET
    name_of_group = '${req.body.name_of_group}'`);
  res.redirect('/groups');
})

app.get('/delete/:id', function(req, res){
  db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`);
  res.redirect('/groups');
});

module.exports = app;
