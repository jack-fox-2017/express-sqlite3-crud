'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const sql = require('sqlite3')

var db = new sql.Database('./db/data.db')

var app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.get('/', function(req, res) {
  res.render('index')
})


///////////////////////////////  CONTACTS  ///////////////////////////////

app.get('/contacts', function(req, res) {
  db.all('SELECT * FROM contacts', function(err, rows) {
    if (!err) {
      res.render('contacts', {
        data: rows
      })
    }
  })
})

//////////////// POST ////////////////

app.post('/contacts', function(req, res) {
  db.run(`INSERT INTO contacts(name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`)
  res.redirect('/contacts')
})

//////////////// EDIT ////////////////

app.get('/contacts/edit/:id', function(req, res) {
  db.all(`SELECT * FROM contacts WHERE id = '${req.params.id}'`, function(err, rows) {
    if (!err) {
      res.render('editcontacts', {
        data: rows
      })
    }
  })
})

app.post('/contacts/edit/:id', function(req, res) {
  db.run(`UPDATE contacts set name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${req.params.id};`)
  res.redirect('/contacts')
})

//////////////// DELETE ////////////////

app.get('/contacts/delete/:id', function(req, res) {
  db.run(`DELETE FROM contacts WHERE id = ${req.params.id};`)
  res.redirect('/contacts')
})



///////////////////////////////  GROUPS  ///////////////////////////////

// app.get('/groups', function(req, res) {
//   res.render('groups')
// })

app.get('/groups', function(req, res) {
  db.all('SELECT * FROM groups', function(err, rows) {
    if (!err) {
      res.render('groups', {
        data: rows
      })
    }
  })
})


//////////////// POST ////////////////

app.post('/groups', function(req, res) {
  db.run(`INSERT INTO groups(name_of_groups) VALUES ('${req.body.name_of_groups}')`)
  res.redirect('/groups')
})

//////////////// EDIT ////////////////

app.get('/groups/edit/:id', function(req, res) {
  db.all(`SELECT * FROM groups WHERE id = '${req.params.id}'`, function(err, rows) {
    if (!err) {
      res.render('editgroups', {
        data: rows
      })
    }
  })
})

app.post('/groups/edit/:id', function(req, res) {
  db.run(`UPDATE groups set name_of_groups = '${req.body.name_of_groups}' WHERE id = '${req.params.id}';`)
  res.redirect('/groups')
})

//////////////// DELETE ////////////////

app.get('/groups/delete/:id', function(req, res) {
  db.run(`DELETE FROM groups WHERE id = '${req.params.id}';`)
  res.redirect('/groups')
})



app.listen(3000, () => {
  console.log('listening on port 3000...');
})
