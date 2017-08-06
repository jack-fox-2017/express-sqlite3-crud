const express = require('express'); //tanda pengenal express di halaman ini
const app = express(); //npm express
const bodyParser = require('body-parser') //bodyParser

app.use(bodyParser.json()) //bodyParser
app.use(bodyParser.urlencoded({extended : true}))//bodyParser

app.set('view engine', 'ejs');// npm view ejs mirip html
const sql = require('sqlite3').verbose();
var db = new sql.Database('./db/data.db'); //berbasis file. kitaharus buat file
//=============================================================Routing

app.get('/', function(req,res){
  res.render('index')
})

app.get('/contacts', function(req,res){
  db.all(`SELECT * FROM Contacts`, function(err, rows){
    if (!err) {
      res.render('contact', {dataC:rows})
    }
  })
})

app.post('/contacts', function(req,res){
  db.run(`INSERT INTO Contacts (name, company, telp_number, email)
  VALUES('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`)
  res.redirect('/contacts')
})

app.get('/contacts/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id} `, function(err, rows){
      res.render('edit_contact', {dataC:rows})
    })
  })

app.post('/contact/edit/:id', function(req, res){
  db.run(`UPDATE Contacts SET name ='${req.body.name}',company = '${req.body.company}',
  telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id =${req.params.id}`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function(req,res){
  db.run(`DELETE FROM Contacts WHERE id = '${req.params.id}'`)
  res.redirect('/contacts')
})

//=============================================================Groups
app.get('/groups', function(req,res){
  db.all(`SELECT * FROM Groups`,function(err,rows){
    res.render('group', {dataG:rows})
  })
})

app.post('/groups', function(req, res){
  db.all(`INSERT INTO Groups (name_of_group)
  VALUES ('${req.body.group}')`)
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function(req, res){
  db.all(`SELECT * FROM Groups WHERE id = ${req.params.id} `, function(err, rows){
      res.render('edit_group', {dataG:rows})
    })
  })


app.post('/groups/edit/:id', function(req,res){
  db.run(`UPDATE Groups SET name_of_group = '${req.body.group}' WHERE id = ${req.params.id}`)
  res.redirect('/groups')
})

app.get('/groups/delete/:id', function(req, res){
  db.run(`DELETE FROM Groups WHERE id = '${req.params.id}'`)
  res.redirect('/groups')
})


app.listen(3000)
