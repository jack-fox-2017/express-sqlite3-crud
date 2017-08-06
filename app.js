let express = require("express")
const app = express()
const bodyParser = require("body-parser")
let sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./Database/data.db")

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//index

app.get('/', function(req, res){
  res.render('index')
})

//contac

app.get ('/contacs', function (req, res) {
  db.all(`select * from cities`, function (err, data) {
    if (!err) {
      res.render('contacs', {
        data: data
      })
    }
  })
})

app.post('/contacs', function(req, res) {
  db.run(`INSERT INTO cities(name, company,phonenumber,email)VALUES("${req.body.name}","${req.body.company}","${req.body.phonenumber}","${req.body.email}")`)
  res.redirect('/contacs')
})

// Edit

app.get("/contacs/edit/:no", function(req,res){
  db.all(`SELECT * FROM cities WHERE no = '${req.params.no}'`, function(err,rows){
    if(!err){
      res.render("editcontacts",{
        data:rows
      })
    }
  })
})


app.post('/contacs/edit/:no', function(req,res) {
  db.run(`UPDATE  cities SET name = "${req.body.name}", company = "${req.body.company}",phonenumber = "${req.body.phonenumber}",email = "${req.body.email}" WHERE no = ${req.params.no}`)
  res.redirect('/contacs')
})

//delete

app.get('/contacs/delete/:no', function(req,res){
  db.run(`DELETE FROM cities WHERE no = '${req.params.no}'`)
  res.redirect('/contacs')
})

// groups

app.get ('/group', function (req, res) {
  db.all(`SELECT * FROM groups`, function (err, data) {
    if (!err) {
      res.render('group', {
        data: data
      })
    }
  })
})

app.post('/group', function(req, res) {
  db.run(`INSERT INTO groups(namegroup)VALUES("${req.body.namegroup}")`)
  res.redirect('/group')
})

//groups edit

app.get("/group/edit/:no", function(req,res){
  db.all(`SELECT * FROM groups WHERE no = '${req.params.no}'`, function(err,rows){
    if(!err){
      res.render("editgroup",{
        data:rows
      })
    }
  })
})

app.post('/group/edit/:no', function(req,res){
  db.run(`UPDATE groups SET namegroup = "${req.body.namegroup}" WHERE no = ${req.params.no}`)
  res.redirect('/group')
})

//group delete

app.get('/group/delete/:no', function(req,res){
  db.run(`DELETE FROM groups WHERE no = '${req.params.no}'`)
  res.redirect('/group')
})


//address

app.get ('/address', function (req, res) {
  db.all(`select * from address`, function (err, data) {
    if (!err) {
      res.render('address', {
        data: data
      })
    }
  })
})

app.post('/address', function(req, res) {
  db.run(`INSERT INTO address(address, city,province,postcode)VALUES("${req.body.address}","${req.body.city}","${req.body.province}","${req.body.postcode}")`)
  res.redirect('/address')
})

//edit

app.get("/address/edit/:no", function(req,res){
  db.all(`SELECT * FROM address WHERE no = '${req.params.no}'`, function(err,rows){
    if(!err){
      res.render("editaddress",{
        data:rows
      })
    }
  })
})

app.post('/address/edit/:no', function(req,res){
  db.run(`UPDATE address SET address = "${req.body.address}",city = "${req.body.city}",province = "${req.body.province}", postcode = "${req.body.postcode}" WHERE no = ${req.params.no}`)
  res.redirect('/address')
})

// delete

app.get('/address/delete/:no', function(req,res){
  db.run(`DELETE FROM address WHERE no = '${req.params.no}'`)
  res.redirect('/address')
})


//profile

app.get ('/profile', function (req, res) {
  db.all(`select * from profiles`, function (err, data) {
    if (!err) {
      res.render('profile', {
        data: data
      })
    }
  })
})

app.post('/profile', function(req, res) {
  db.run(`INSERT INTO profiles(username, password) VALUES("${req.body.username}","${req.body.password}")`)
  res.redirect('/profile')
})

// edit

app.get("/profile/edit/:no", function(req,res){
  db.all(`SELECT * FROM profiles WHERE no = '${req.params.no}'`, function(err,rows){
    if(!err){
      res.render("editprofile",{
        data:rows
      })
    }
  })
})

app.post('/profile/edit/:no', function(req,res){
  db.run(`UPDATE profiles SET username = "${req.body.username}", password = "${req.body.password}" WHERE no = ${req.params.no}`)
  res.redirect('/profile')
})

//delete

app.get('/profile/delete/:no', function(req,res){
  db.run(`DELETE FROM profiles WHERE no = '${req.params.no}'`)
  res.redirect('/profile')
})

app.listen(3000, function() {
  console.log("sudah jalan di port 3000")
})
