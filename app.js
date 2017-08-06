const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

var setupDB = require('./setup');

app.set('view engine', 'ejs');

app.use(bodyParser.json());// digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({extended : true}));// hasil post di encoded

var path_name = path.join(__dirname, 'public');// untuk memanggil isi file dari public yg non ejs, ejs tidak boleh di dalam folder public, karna public hanya untuk file yang bersifat static
var express_static = express.static(path_name);

//create table contact
app.get('/setupdb', function(req, res){
  setupDB();
  res.send('Database Table Created!!');
});
//create table ContactGroup
app.get('/dbgroup', function(req, res){
  db.run('CREATE TABLE IF NOT EXISTS ContactGroup(id INTEGER primary key AUTOINCREMENT, GroupName TEXT)');
  res.send('Database Group telah di buat');
});

//home page
app.get('/home', function(req, res){
  res.render('home');
});
//contact page
app.get('/contact', function(req, res){
  db.all(`SELECT * FROM Contact`, function(err, data){
    res.render('contact', {data_contact: data});
  });
});
//go to form page
app.get('/contact/add', function(req, res){
  res.render('form');
});
//submit data from add page and will going back to contact page
app.post('/contact/add', function(req, res){
  db.run(`INSERT INTO Contact(Name, Company, Telp, Email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp}', '${req.body.email}')`);
  res.redirect('/contact');
})
// go to edit page and only select the data for each id
app.get('/contact/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contact WHERE id = '${req.params.id}'`, function(err, result){
    res.render('edit', {data: result});
  });
});
// action or post edit from the form page
app.post('/contact/edit/:id', function(req, res){
  db.run(`UPDATE Contact SET Name = '${req.body.Name}', Company = '${req.body.Company}', Telp = '${req.body.Telp}', Email = '${req.body.Email}' WHERE id = ${req.params.id}`);
  res.redirect('/contact');
});
// delete, use app.get for delete, becuse the system only take the data from database and there is no recieving data bro user
app.get('/contact/delete/:id', function(req, res){
  db.run(`DELETE FROM Contact WHERE id = '${req.params.id}'`);
  res.redirect('/contact');
});

//-------------------------------------------
//-----------------GAP-----------------------
//-------------------------------------------

//show group info on group page
app.get('/group', function(req, res){
  db.all('SELECT * FROM ContactGroup', function(err, data){
    res.render('group', {dataGroup: data});
  });
});
//going to group form for add group
app.get('/group/addgroup', function(req, res){
  res.render('groupaddform');
});
//add new group on database
app.post('/group/addgroup', function(req, res){
  db.run(`INSERT INTO ContactGroup(GroupName) VALUES ('${req.body.groupname}')`)
  res.redirect('/group');
})
//go to the group edit form
app.get('/group/edit/:id', function(req, res){
  db.all(`SELECT * FROM ContactGroup WHERE id = '${req.params.id}'`, function(err, result){
    res.render('groupedit', {dataGroup: result});
  });
});
//edit data group from groupeditform
app.post('/group/edit/:id', function(req, res){
  db.run(`UPDATE ContactGroup SET GroupName = '${req.body.groupname}' WHERE id = ${req.params.id}`);
  res.redirect('/group');
})
//delete data from group info interface
app.get('/group/delete/:id', function(req, res){
  db.run(`DELETE FROM ContactGroup WHERE id = ${req.params.id}`);
  res.redirect('/group');
})


app.listen(3000);
