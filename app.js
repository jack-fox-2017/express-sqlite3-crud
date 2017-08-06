//require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sql = require('sqlite3').verbose();

let db = new sql.Database('./db/data.db'); //instances sql db with parameter: path of db file

app.use(bodyParser.json()); //use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs'); //set views directory with ejs file inside

//index
app.get('/', (req,res) => {
  res.render('index');
});

//contacts
app.get('/contacts', (req, res)=>{
  db.all(`SELECT * FROM CONTACTS`, (err, rows)=>{
    if(err){
      throw err;
    }
    res.render('contacts', {data:rows});
  });
});

app.post('/contacts', (req, res)=>{
  db.run(`INSERT INTO CONTACTS (name, company, telp_number, email) VALUES (
    '${req.body.name}',
    '${req.body.company}',
    '${req.body.telp_number}',
    '${req.body.email}'
  )`);
  res.redirect('/contacts');
});

app.get('/contacts/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM CONTACTS WHERE id=${req.params.id}`,
  (err, rows)=>{
    if(err){
      throw err;
    }
    res.render('edit-contact', {data:rows});
  });
});

app.post('/contacts/edit/:id', (req, res)=>{
  db.run(`UPDATE CONTACTS SET
    name='${req.body.name}',
    company='${req.body.company}',
    telp_number='${req.body.telp_number}',
    email='${req.body.email}'
    WHERE id=${req.params.id}`);
  res.redirect('/contacts');
});

app.get('/contacts/del/:id', (req, res)=>{
  db.run(`DELETE FROM CONTACTS WHERE id=${req.params.id}`);
  res.redirect('/contacts');
});

//groups
app.get('/groups', (req,res)=>{
  db.all(`SELECT * FROM GROUPS`, (err, rows) => {
    if (err){
      throw err
    }
    res.render('groups', {data:rows})
  });
});

app.post('/groups', (req, res)=>{
  db.run(`INSERT INTO GROUPS (name_of_group) VALUES ('${req.body.name_of_group}')`);
  res.redirect('/groups');
});

app.get('/groups/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM GROUPS WHERE id=${req.params.id}`, (err,rows) =>{
    if(err){
      throw err;
    }
    res.render('edit-group',{data:rows});
  });
});

app.post('/groups/edit/:id', (req, res)=>{
  db.run(`UPDATE GROUPS SET name_of_group='${req.body.name_of_group}' WHERE id=${req.params.id}`);
  res.redirect('/groups');
});

app.get('/groups/del/:id', (req, res)=>{
  db.run(`DELETE FROM GROUPS WHERE id=${req.params.id}`);
  res.redirect('/groups');
});

//addresses
app.get('/addresses', (req,res)=>{
  db.all(`SELECT * FROM ADDRESSES`, (err, rows) => {
    if (err){
      throw err
    }
    res.render('addresses', {data:rows})
  });
});

app.post('/addresses', (req, res)=>{
  db.run(`INSERT INTO ADDRESSES (street, city, state, country, post_code) VALUES
  ('${req.body.street}','${req.body.city}','${req.body.state}','${req.body.country}', '${req.body.post_code}')`);
  res.redirect('/addresses');
});

app.get('/addresses/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM ADDRESSES WHERE id=${req.params.id}`, (err,rows) =>{
    if(err){
      throw err;
    }
    res.render('edit-address',{data:rows});
  });
});

app.post('/addresses/edit/:id', (req, res)=>{
  db.run(`UPDATE ADDRESSES SET street='${req.body.street}', city='${req.body.city}', state='${req.body.state}', country='${req.body.country}', post_code='${req.body.post_code}' WHERE id=${req.params.id}`);
  res.redirect('/addresses');
});

app.get('/addresses/del/:id', (req, res)=>{
  db.run(`DELETE FROM ADDRESSES WHERE id=${req.params.id}`);
  res.redirect('/addresses');
});

//profiles
app.get('/profiles', (req,res)=>{
  db.all(`SELECT * FROM PROFILES`, (err, rows) => {
    if (err){
      throw err
    }
    res.render('profiles', {data:rows})
  });
});

app.post('/profiles', (req, res)=>{
  db.run(`INSERT INTO PROFILES (date_of_birth, age, hobby) VALUES
  ('${req.body.date_of_birth}','${req.body.age}','${req.body.hobby}')`);
  res.redirect('/profiles');
});

app.get('/profiles/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM PROFILES WHERE id=${req.params.id}`, (err,rows) =>{
    if(err){
      throw err;
    }
    res.render('edit-profile',{data:rows});
  });
});

app.post('/profiles/edit/:id', (req, res)=>{
  db.run(`UPDATE PROFILES SET date_of_birth='${req.body.date_of_birth}', age='${req.body.age}', hobby='${req.body.hobby}' WHERE id=${req.params.id}`);
  res.redirect('/profiles');
});

app.get('/profiles/del/:id', (req, res)=>{
  db.run(`DELETE FROM PROFILES WHERE id=${req.params.id}`);
  res.redirect('/profiles');
});

//listen to localhost:3000
app.listen(3000, ()=>{
  console.log('listening on port 3000');
});
