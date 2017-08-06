const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sql = require('sqlite3').verbose();
let db = new sql.Database('./db/data.db');

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
  res.render('index');
});

app.get('/contacts', (req, res)=>{
  res.render('contacts');
});

app.get('/groups', (req,res)=>{
  res.render('groups');
});


app.listen(3000, ()=>{
  console.log('listening on port 3000');
});
