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

app.listen(3000, function() {
  console.log('I am listening port 3000');
})
