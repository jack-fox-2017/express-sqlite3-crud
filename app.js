'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');
const express = require('express');
const app = express();

const DbModel = require('./models/dbModels');
let dbModel = new DbModel('./db/data.db');
const connection= dbModel.connection;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

let index = require('./routers/index');
let contacts = require('./routers/contact');
let groups = require('./routers/group');
let addresses = require('./routers/address');
let addresses_with_contact = require('./routers/addresswith');
let profiles = require('./routers/profile');

app.use('/', index);
app.use('/contacts', contacts);
app.use('/groups', groups);
app.use('/addresses', addresses);
app.use('/addresses_with_contact', addresses_with_contact);
app.use('/profiles', profiles);

// app.get('/createTable', function(req,res){
//   dbModel.createAllTable();
//   res.send('table created~')
// })

app.listen(3000);
