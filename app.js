'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// ========================================================
// HOME

app.get('/', function(req, res){
  res.render('index');
})

// ========================================================
// CONTACTS

let contacts = require('./routers/contact');
app.use('/contacts', contacts);
let groups = require('./routers/group');
app.use('/groups', groups);
let addresses = require('./routers/address');
app.use('/addresses', addresses);
let profiles = require('./routers/profile');
app.use('/profiles', profiles);

app.listen(3000);
