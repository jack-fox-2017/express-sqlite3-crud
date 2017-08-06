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

//listen to localhost:3000
app.listen(3000, ()=>{
  console.log('listening on port 3000');
});
