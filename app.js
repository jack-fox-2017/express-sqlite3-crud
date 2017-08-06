const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/data.db')

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))




app.get('/', (req, res) => {
  res.render('index')
})



// ----------------------------------CONTACTS---------------------------------------

app.get('/contacts', (req, res) => {
  db.all(`SELECT * FROM Contacts`, (err, rows) => {
    if (!err) {
      res.render('contacts', {data: rows})
    }
  })
})

app.post('/contacts', (req, res) => {
  // res.send('post contacts!')
  db.run(`INSERT INTO Contacts (name, company, phone, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.phone}', '${req.body.email}')`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', (req, res) => {
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`)
  res.redirect('/contacts')
})

app.get('/contacts/edit/:id', (req, res) => {
  db.all(`SELECT * FROM Contacts WHERE id=${req.params.id}`, (err, rows) => {
    if (!err) {
      res.render('contacts_edit', {data: rows})
      // res.send(rows)
    }
  })
})

app.post('/contacts/edit/:id', (req, res) => {
  db.run(`UPDATE Contacts SET name='${req.body.name}', company='${req.body.company}', phone='${req.body.phone}', email='${req.body.email}' WHERE id=${req.params.id}`)
  res.redirect('/contacts')
})



// ----------------------------------GROUPS---------------------------------------

app.get('/groups', (req, res) => {
  db.all(`SELECT * FROM Groups`, (err, rows) => {
    if (!err) {
      res.render('groups', {data: rows})
    }
  })
})

app.post('/groups', (req, res) => {
  db.run(`INSERT INTO Groups (name) VALUES ('${req.body.name}')`)
  res.redirect('/groups')
})

app.get('/groups/delete/:id', (req, res) => {
  db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`)
  res.redirect('/groups')
})

app.get('/groups/edit/:id', (req, res) => {
  db.all(`SELECT * FROM Groups WHERE id=${req.params.id}`, (err, rows) => {
    if (!err) {
      res.render('groups_edit', {data: rows})
    }
  })
})

app.post('/groups/edit/:id', (req, res) => {
  db.run(`UPDATE Groups SET name='${req.body.name}' WHERE id=${req.params.id}`)
  res.redirect('/groups')
})



// ----------------------------------PROFILES---------------------------------------

app.get('/profiles', (req, res) => {
  db.all(`SELECT Profiles.id AS profileId, Profiles.username, Profiles.password, Profiles.Contacts_id, Contacts.name FROM Profiles JOIN Contacts ON Profiles.Contacts_id = Contacts.id;`, (err, data) => {
    db.all(`SELECT * from Contacts;`, (err, data2) => {
      res.render('profiles', {data: data, data2: data2})
    })
  })
})

app.post('/profiles', (req, res) => {
  db.run(`INSERT INTO Profiles (username, password, Contacts_id) VALUES ('${req.body.username}', '${req.body.password}', ${req.body.contactId})`)
  res.redirect('/profiles')
})

app.get('/profiles/delete/:id', (req, res) => {
  db.run(`DELETE FROM Profiles WHERE id = '${req.params.id}';`)
  res.redirect('/profiles')
})

app.get('/profiles/edit/:id', (req,res) => {
  db.all(`SELECT * FROM Profiles WHERE id = '${req.params.id}';`, (err, data) => {
    db.all(`SELECT * FROM Contacts;`, (err, data2) => {
      res.render('profiles_edit', {data: data, data2: data2})
    })
  })
})

app.post('/profiles/edit/:id', (req, res) => {
  db.run(`UPDATE Profiles SET username='${req.body.username}', password='${req.body.password}', Contacts_id = ${req.body.contactId} WHERE id = ${req.params.id}`)
  res.redirect('/profiles')
})



// ----------------------------------ADDRESSES---------------------------------------

app.get('/addresses', (req, res) => {
  db.all(`SELECT Addresses.id AS addressId, Addresses.street, Addresses.city, Addresses.Contacts_id, Contacts.name FROM Addresses JOIN Contacts ON Addresses.Contacts_id = Contacts.id;`, (err,  data) => {
    db.all(`SELECT * from Contacts;`, (err, data2) => {
      res.render('addresses', {data: data, data2: data2})
    })
  })
})

app.post('/addresses', (req, res) => {
  db.run(`INSERT INTO Addresses (street, city, Contacts_id) VALUES ('${req.body.street}', '${req.body.city}', ${req.body.contactId})`)
  res.redirect('/addresses')
})

app.get('/addresses/delete/:id', (req, res) => {
  db.run(`DELETE FROM Addresses WHERE id = '${req.params.id}';`)
  res.redirect('/addresses')
})

app.get('/addresses/edit/:id', (req,res) => {
  db.all(`SELECT * FROM Addresses WHERE id = '${req.params.id}';`, (err, data) => {
    db.all(`SELECT * FROM Contacts;`, (err, data2) => {
      res.render('addresses_edit', {data: data, data2: data2})
    })
  })
})

app.post('/addresses/edit/:id', (req, res) => {
  db.run(`UPDATE Addresses SET street='${req.body.street}', city='${req.body.city}', Contacts_id = ${req.body.contactId} WHERE id = ${req.params.id}`)
  res.redirect('/addresses')
})






app.listen(3000)
