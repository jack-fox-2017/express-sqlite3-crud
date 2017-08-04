var express = require('express');
var path = require('path');
var sqlite3 = require('sqlite3')
  .verbose();
var bodyParser = require('body-parser')
// var setup = require('./setup.js')


var db = new sqlite3.Database('./db/data.db');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

//
// function insertData(param)} {
//   //INSERT INTO NAMA_TABLE (nama_column1, column2) VALUES(value1, value2)
//   db.run(`INSERT INTO contacts (name, company, telp_number, email)
//   VALUES (${param.nama}, ${param.corp}, ${param.phone}, ${param.email});`)
//   console.log('Data created');
// }
// //
// // function updateData() {
// //   //UPDATE NAMA_TABLE SET column_yangingindiubah WHERE condition
// //   UPDATE Students SET lastName = 'End', email =  WHERE id = 3;
// // }
// //
// // function deleteData() {
// //   //DELETE FROM NAMA_TABLE WHERE condition
// //   DELETE FROM Students WHERE id = 3;
// // }
// //
// // function showData() {
// //   db.all(`SELECT firstName FROM Students`, function (err, rows) {
// //     if (!err) {
// //       rows.forEach(row => {
// //         console.log(`${row.firstName} ${row.email}`);
// //       })
// //     }
//   })


app.get('/', function (req, res) {
  res.render('index', {
    title: 'WELCOME'
  })
})

//EDIT PAGE
app.get('/contacts/edit/:id', function (req, res) {
  db.all(`select * from contacts where id = ${req.params.id}`, function (err, rows) {
    if (!err) {
      res.render('edit', {
        cont: rows
      })
    }
  })
})

// EDIT
app.post('/contacts/edit/:id', function (req, res) {
  // console.log(req.body);
  db.run(`UPDATE contacts SET name = '${req.body.nama}', company = '${req.body.corp}', telp_number = '${req.body.phone}', email = '${req.body.email}'  WHERE id = ${req.params.id};`)
  res.redirect('/contacts')
})

//DELETE
app.get('/contacts/delete/:id', function (req, res) {
  // console.log(req.body);
  db.run(`DELETE FROM contacts WHERE id = ${req.params.id};`)
  res.redirect('/contacts')
})

// LIST
app.get('/contacts', function (req, res) {
  db.all(`SELECT * FROM contacts`, function (err, rows) {
    if (!err) {
      res.render('contacts', {
        dataContact: rows
      })
    }
  })
})

// ADD
app.post('/contacts', function (req, res) {
  // console.log(req.body);
  db.run(`INSERT INTO contacts (name, company, telp_number, email)
    VALUES ('${req.body.nama}', '${req.body.corp}', '${req.body.phone}', '${req.body.email}');`)
  console.log('Data created');
  res.redirect('/contacts')
})


//groups


app.get('/groups', function (req, res) {
  db.all(`SELECT * FROM groups`, function (err, rows) {
    if (!err) {
      res.render('groups', {
        dataGroup: rows
      })
    }
  })
})

app.post('/groups', function (req, res) {
  // console.log(req.body);
  db.run(`INSERT INTO groups (name_of_group)
    VALUES ('${req.body.grup}');`)
  console.log('Data created');
  res.redirect('/groups')
})

//EDIT PAGE
app.get('/groups/editG/:id', function (req, res) {
  db.all(`select * from groups where id = ${req.params.id}`, function (err, rows) {
    if (!err) {
      res.render('editG', {
        cont: rows
      })
    }
  })
})

// EDIT
app.post('/groups/editG/:id', function (req, res) {
  // console.log(req.body);
  db.run(`UPDATE groups SET name_of_group = '${req.body.grup}'  WHERE id = ${req.params.id};`)
  res.redirect('/groups')
})

//DELETE
app.get('/groups/delete/:id', function (req, res) {
  // console.log(req.body);
  db.run(`DELETE FROM groups WHERE id = ${req.params.id};`)
  res.redirect('/groups')
})


app.listen(3000);
