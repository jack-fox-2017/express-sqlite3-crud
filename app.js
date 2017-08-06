const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./database/data.db')
var app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//--------HomePage--------//
app.get("/", function(req, res) {
  res.render("index")
})

//--------ContactPage--------//
// app.get("/contact", function(req, res) {
//   res.render("contact")
// })

app.get("/contact", function(req, res) {
  db.all('SELECT * FROM Contacts', function(err, rows) {
    if(!err) {
      res.render('contact', {data: rows})
    }
  })
})

app.post("/contact", function(req, res) {
  db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`)
  res.redirect('/contact')
})

//***EditContact***//
app.get("/contact/edit-contact/:id", function(req, res) {
  db.all(`SELECT * FROM Contacts WHERE id = '${req.params.id}'`, function(err, rows) {
    if(!err) {
      res.render('edit-contact', {data: rows})
    }
  })
})

app.post("/contact/edit-contact/:id", function(req, res) {
  db.run(`UPDATE Contacts set name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${req.params.id};`)
  res.redirect("/contact")
})

//***DeleteContact***//
app.get("/contact/delete/:id", function(req, res) {
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`)
  res.redirect("/contact")
})

//--------GroupPage--------//
app.get("/group", function(req, res) {
  db.all('SELECT * FROM Groups', function(err, rows) {
    if(!err) {
      res.render('group', {data: rows})
    }
  })
})

app.post("/group", function(req, res) {
  db.run(`INSERT INTO Groups (name_of_group) VALUES ('${req.body.name_of_group}')`)
  res.redirect('/group')
})

//***EditGroup***//
app.get("/group/edit-group/:id", function(req, res) {
  db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}'`, function(err,rows) {
    if(!err) {
      res.render('edit-group', {data: rows})
    }
  })
})

app.post("/group/edit-group/:id", function(req, res) {
  db.run(`UPDATE Groups set name_of_group = '${req.body.name_of_group}' WHERE id = ${req.params.id};`)
  res.redirect("/group")
})

//***DeleteGroup***//
app.get("/group/delete/:id", function(req, res) {
  db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`)
  res.redirect("/group")
})

//--------AddressPage--------//
app.get("/address", function(req, res) {
  db.all('SELECT * FROM Address', function(err, rows) {
    if(!err) {
      res.render('address', {data: rows})
    }
  })
})

app.post("/address", function(req, res) {
  db.run(`INSERT INTO Address (group_name, city, province, state, zipcode)VALUES ('${req.body.group_name}', '${req.body.city}', '${req.body.province}', '${req.body.state}', '${req.body.zipcode}')`)
  res.redirect('/address')
})

//***EditAddress***//
app.get("/address/edit-address/:id", function(req, res) {
  db.all(`SELECT * FROM Address WHERE id = '${req.params.id}'`, function(err,rows) {
    if(!err) {
      res.render('edit-address', {data: rows})
    }
  })
})

app.post("/address/edit-address/:id", function(req, res) {
  db.run(`UPDATE Address set group_name = '${req.body.group_name}', city = '${req.body.city}', province = '${req.body.province}', state = '${req.body.state}', zipcode = '${req.body.zipcode}' WHERE id = ${req.params.id};`)
  res.redirect("/address")
})

//***DeleteAddress***//
app.get("/address/delete/:id", function(req, res) {
  db.run(`DELETE FROM Address WHERE id = ${req.params.id}`)
  res.redirect("/address")
})

//--------ProfilePage--------//
app.get("/profile", function(req, res) {
  db.all('SELECT * FROM Profiles', function(err, rows) {
    if(!err) {
      res.render('profile', {data: rows})
    }
  })
})

app.post("/profile", function(req, res) {
  db.run(`INSERT INTO Profiles (username, password) VALUES ('${req.body.username}', '${req.body.password}')`)
  res.redirect("/profile")
})

//***EditProfile***//
app.get("/profile/edit-profile/:id", function(req, res) {
  db.all(`SELECT * FROM Profiles WHERE id = '${req.params.id}'`, function(err,rows) {
    if(!err) {
      res.render('edit-profile', {data: rows})
    }
  })
})

app.post("/profile/edit-profile/:id", function(req, res) {
  db.run(`UPDATE Profiles set username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${req.params.id};`)
  res.redirect("/profile")
})

//***DeleteProfile***//
app.get("/profile/delete/:id", function(req, res) {
  db.run(`DELETE FROM Profiles WHERE id = ${req.params.id}`)
  res.redirect("/profile")
})


app.listen(3000, function () {
  console.log("Im Listen on Port 3000");
})
