const express = require('express')
const app = express();
// const fs = require('fs')
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose()
//'sqlite3').verbose();

// var db = new sqlite3.Database('./db/data.db')
// app.use(bodyParser.json)
// app.use(bodyParser.urlencoded({extended: true}))
// app.set('view engine', 'ejs');
// SOAL
// Structure table:
// * Contacts: id type integer, name type string, company type string, telp_number type string, email type string
// * Groups: id type integer, name_of_group type string

const db = new sqlite3.Database('./db/data.db')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
 }));

app.set('view engine', 'ejs');

//TES INDEX
app.get('/', function(req,res){
  //res.send('index')
  res.render('index')
})

// app.get('/', function(req,res){
  // db.all(`SELECT * FROM CITIES`, function(err,rows){
  //   if(!err){
  //     res.render('index',{data,rows})}
  // })
// })

//if error = NOT TRUE,,, JIKA NGGA ERROR....
//----------------------------CONTACT-------------------------------
app.get('/contact', function(req,res){
  db.all(`SELECT * FROM contacts`, function(err,rows){
    if(!err){
      res.render('contact',{data: rows})}
  })
})

app.post('/contact', function(req,res){
  db.run(`INSERT INTO contacts(name,company,telp_number,email)
  VALUES ('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')
  `)
  res.redirect(`/contact`)
})

//cek
app.get('/contact/edit/:id', function(req,res){
  db.each(`SELECT * FROM contacts WHERE id='${req.params.id}'`, function(err,rows){
    if(!err){
      res.render('editcontact',{data: rows})
      //res.send('ogi');
    }
  })
})

//cek...
app.post('/contact/edit/:id', function(req,res){
  db.run(`UPDATE contacts SET name='${req.body.name}',company='${req.body.company}',telp_number='${req.body.telp_number}',email='${req.body.email}' WHERE id='${req.pramas.id}'`)
  res.redirect(`/contact`)
})

//cek
app.get('/contact/delete/:id', function(req,res){
// app.get('/contacs/delete/:no', function(req,res){
  db.run(`DELETE FROM contacts WHERE id='${req.params.id}'`)
  res.redirect(`/contact`)
})



//-------------------------------GROUP----------------------------------

//cek...
app.get('/group', function(req,res){
  db.all(`SELECT * FROM groups`, function(err,rows){
    if(!err){
      res.render('group',{data: rows})
    }
  })
})

app.post('/group', function(req,res){
  db.run(`INSERT INTO groups(name_of_group)
  VALUES ('${req.body.name_of_group}')
  `)
  res.redirect(`/group`)
})


app.get('/group/edit/:id', function(req,res){
  db.each(`SELECT * FROM groups WHERE id='${req.params.id}'`, function(err,rows){
    if(!err){
      res.render('editgroup',{data: rows})
    }
  })
})

app.post('/group/edit/:id', function(req,res){
  db.run(`UPDATE groups SET name_of_group='${req.body.name_of_group}' WHERE id='${req.params.id}'`)
  res.redirect(`/group`)
})

//cek
app.get('/group/delete/:id', function(req,res){
  db.run(`DELETE FROM groups WHERE id='${req.params.id}'`)
  res.redirect(`/group`)
})

//-------------------------------ADDRESSES----------------------------

app.get('/address', function(req,res){
  db.all(`SELECT * FROM addresses`, function(err,rows){
    if(!err){
      res.render('address',{data: rows})
    }
  })
})

app.post('/address', function(req,res){
  db.run(`INSERT INTO addresses(jalan,kota,provinsi)VALUES('${req.body.jalan}','${req.body.kota}','${req.body.provinsi}')`)
  res.redirect('/address')
})

app.get('/address/edit/:id', function(req,res){
  db.all(`SELECT * FROM addresses WHERE id = ${req.params.id}`, function(err,rows){
    if(!err){
      res.render('editaddress',{data: rows})
    }
  })
})

app.post('/address/edit/:id', function(req,res){
  db.run(`UPDATE addresses SET jalan='${req.body.jalan}',kota='${req.body.kota}',provinsi='${req.body.provinsi}'WHERE id=${req.params.id}`)
  res.redirect('/address')
})

app.get('/address/delete/:id', function(req,res){
  db.run(`DELETE FROM addresses WHERE id=${req.params.id}`)
  res.redirect('/address')
})


//-------------------------------PROFILE------------------------------

app.get('/profile', function(req,res){
  db.all(`SELECT * FROM profile`, function(err,rows){
    if(!err){
      res.render('profile',{data: rows})
    }
  })
})

app.post('/profile', function(req,res){
  db.run(`INSERT INTO profile(usia,pendidikan,pengalaman)VALUES('${req.body.usia}','${req.body.pendidikan}','${req.body.pengalaman}')`)
  res.redirect('/profile')
})

app.get('/profile/edit/:id', function(req,res){
  db.all(`SELECT * FROM profile WHERE id = ${req.params.id}`, function(err,rows){
    if(!err){
      res.render('editprofile',{data: rows})
    }
  })
})

app.post('/profile/edit/:id', function(req,res){
  db.run(`UPDATE profile SET usia='${req.body.usia}',pendidikan='${req.body.pendidikan}',pengalaman='${req.body.pengalaman}'WHERE id=${req.params.id}`)
  res.redirect('/profile')
})

app.get('/profile/delete/:id', function(req,res){
  db.run(`DELETE FROM profile WHERE id=${req.params.id}`)
  res.redirect('/profile')
})


app.listen(3000, function(){
  console.log("Port 3000 on my way");
});
