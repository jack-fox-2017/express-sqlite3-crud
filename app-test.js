const express = require('express')
const app = express();
// const fs = require('fs')
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
//'sqlite3').verbose();

// var db = new sqlite3.Database('./db/data.db')

// app.use(bodyParser.json)
// app.use(bodyParser.urlencoded({extended: true}))

// app.set('view engine', 'ejs');

app.get('/', function(req,res){
  console.log('LOL');
  // db.all(`SELECT * FROM CITIES`, function(err,rows){
  //   if(!err){
  //     res.render('index',{data,rows})
  //   }
  // })

  res.send('tess')
})

// app.post('/', function(req,res){
//   db.run(`INSERT INTO CITIES(id, kota, provincce, gubernur))VALUES (${req.body.ID},'${req.body.kota}','${req.body.province}','${req.body.gubernur}')`)//bentuknya mesti string
//   res.redirect('/')
// })

app.listen(3000,function(){
  console.log('port 3000');
})
