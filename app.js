const express = require('express') //*3
const app = express() //*2
const bodyParser = require('body-parser') //*3
const sqlite3 = require('sqlite3').verbose() //*4

var db = new sqlite3.Database('./db/contactgroup.db') //*5

app.set('view engine','ejs') //*6
app.use(bodyParser.json()) //*7
app.use(bodyParser.urlencoded({extended: true})) //*8

app.get('/', function (req,res){
  // res.send('Hello World') //res.send => mengirimkan pesan ke ...
  res.render('index')
})

//Menampilkan Tabel Isi Databased /contacts
app.get('/contacts', function(req,res){
  db.all('SELECT * FROM CONTACTS', function(err, rows){
    if(!err){
      res.render('contacts',{data: rows})
    }
  })
})
//== Menampilkan Tabel Isi Database Group
app.get('/groups', function(req,res){
  db.all(`SELECT * FROM GROUPS`, function(err,rows){
    if(!err){
      res.render('groups',{data: rows})
    }
  })
})


//============= Membuat Inputan /contacts
app.post('/contacts', function(req,res){
  db.run(`INSERT INTO CONTACTS(id,name,company,telp_number,email)
  VALUES (${req.body.id},'${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')
  `)
  res.redirect(`/contacts`)
})
//================ Membuat Inputan Group
app.post('/groups', function(req,res){
  db.run(`INSERT INTO GROUPS(id,name_of_group)
  VALUES (${req.body.id}, '${req.body.name_of_group}')
  `)
  res.redirect(`/groups`)
})


//============== Membuat Delete Contacts
//============== Membuat Delete Grub


//======================================
app.listen(3000, function(){ //*9
  console.log('Example app listening on port 3000!');
})


/*
1.
2.
3.
4.
5.
6.
7.
8.
9.
*/
