// require expree require express/bodyParser/sqlite3
const express = require ('express');
const app = express();

const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')
///////////////////////////////////////////////////

// body parser true
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// ejs
app.set('view engine', 'ejs');

app.get('/', function(req,res){
  res.render('index')
})

// Contacts: id type integer, name type string, company type string, telp_number type string, email type string
// Groups: id type integer, name_of_group type string

app.get('/contact', function(req,res){
  db.all(`SELECT * FROM contact`, function(err,rows){
    if(!err){
      res.render('contact',{data: rows})
    }
  })
})

app.post('/contact', function(req,res){
  db.run(`INSERT INTO contact(name,company,telp_number,email)
  VALUES ('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')
  `)
  res.redirect(`/contact`)
})

app.get('/contact/delete', function(req,res){
  //res.send(`id`+req.query.id) untuk menangkap tag ?
  db.run(`DELETE FROM contact WHERE id='${req.query.id}'`)
  res.redirect(`/contact`)
})

app.get('/contact/edit', function(req,res){
  db.each(`SELECT * FROM contact WHERE id='${req.query.id}'`, function(err,rows){
    if(!err){
      //res.send(rows);
      res.render('edit-contact',{data: rows})
    }
  })
})

app.post('/contact/edit', function(req,res){
  db.run(`UPDATE contact SET name='${req.body.name}',company='${req.body.company}',telp_number='${req.body.telp_number}',email='${req.body.email}' WHERE id='${req.query.id}'`)
  res.redirect(`/contact`)
})

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

app.get('/group/delete', function(req,res){
  //res.send(`id`+req.query.id) untuk menangkap tag ?
  db.run(`DELETE FROM groups WHERE id='${req.query.id}'`)
  res.redirect(`/group`)
})

app.get('/group/edit', function(req,res){
  db.each(`SELECT * FROM groups WHERE id='${req.query.id}'`, function(err,rows){
    if(!err){
      res.render('edit-group',{data: rows})
    }
  })
})

app.post('/group/edit', function(req,res){
  db.run(`UPDATE groups SET name_of_group='${req.body.name_of_group}' WHERE id='${req.query.id}'`)
  res.redirect(`/group`)
})

app.get('/profile', function(req,res){
  db.all(`SELECT id,name FROM profile`, function(err,rows){
    if(!err){
      res.render('profile',{data: rows})
    }
  })
})

app.post('/profile', function(req,res){
  //res.send(req.body)
  db.run(`INSERT INTO profile(name,gender,born_date,telp_number,company,email) VALUES('${req.body.name}','${req.body.gender}','${req.body.year}-${req.body.month}-${req.body.day}','${req.body.telp_number}','${req.body.company}','${req.body.email}')`)
  res.redirect('profile')
})

app.get('/profile/detail', function(req,res){
  //res.send(req.query.id)
  db.all(`SELECT * FROM profile JOIN addresses WHERE profile.id = addresses.id_profile AND profile.id = '${req.query.id}'`, function(err,rows){
    if(!err){
      //res.send(rows)
      res.render('profile-detail',{data: rows})
    }
  })

  // db.each(`SELECT * FROM profile WHERE id='${req.query.id}'`, function(err,rows){
  //   if(!err){
  //     res.render('profile-detail',{data: rows})
  //   }
  // })
})

app.post('/profile/detail', function(req,res){
  db.run(`INSERT INTO addresses(id_profile,address) VALUES(${req.query.id},'${req.body.address}')`)
  res.redirect(`/profile/detail?id=${req.query.id}`)
})

app.listen(3000, function(){
  console.log("Iam listen on port 3000");
});
