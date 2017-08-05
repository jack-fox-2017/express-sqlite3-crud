const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('./db/data.db')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.get('/', function(req,res) {
  // res.send('hello')
  res.render('index')
})

//-----------CONTACTS-----------

app.get('/contacts', (req,res) => {
  db.all(`SELECT * FROM Contacts`, (err, contact) => {
    if(!err) {
      // console.log(contact);
      res.render('contacts', {ctc: contact})
    }
  })
})

app.post('/contacts', (req,res) => {
  db.run(`INSERT INTO Contacts (name, company, telp_number, email)
          VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`)
    // if(!err) {
  res.redirect('/contacts')
    // }
    // console.log('berhasil tambah data');
})

app.get('/contacts/edit/:id', (req,res) => {
  db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, (err, contact) => {
    if(!err) {
      res.render('edit-contact', {ctc: contact})
    }
  })
})

app.post('/contacts/edit/:id', (req,res) => {
  db.run(`UPDATE Contacts
          SET name='${req.body.name}',company='${req.body.company}',telp_number='${req.body.telp_number}',email='${req.body.email}'
          WHERE id=${req.params.id}`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', (req,res) => {
  db.run(`DELETE FROM Contacts WHERE id=${req.params.id}`)
  res.redirect('/contacts')
})

//-----------GROUPS-----------

app.get('/groups', (req,res) => {
  db.all(`SELECT * FROM Groups`, (err, group) => {
    if(!err) {
      // console.log(contact);
      res.render('groups', {grp: group})
    }
  })
})

app.post('/groups', (req,res) => {
  db.run(`INSERT INTO Groups (name_of_group)
          VALUES ('${req.body.name_of_group}')`)
    // if(!err) {
  res.redirect('/groups')
    // }
    // console.log('berhasil tambah data');
})

app.get('/groups/edit/:id', (req,res) => {
  db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`, (err, group) => {
    if(!err) {
      res.render('edit-group', {grp: group})
    }
  })
})

app.post('/groups/edit/:id', (req,res) => {
  db.run(`UPDATE Groups
          SET name_of_group='${req.body.name_of_group}' WHERE id=${req.params.id}`)
  res.redirect('/groups')
})

app.get('/groups/delete/:id', (req,res) => {
  db.run(`DELETE FROM Groups WHERE id=${req.params.id}`)
  res.redirect('/groups')
})




app.listen(3000, function() {
  console.log('I am listening port 3000');
})
