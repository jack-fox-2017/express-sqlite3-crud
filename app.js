const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./Database/data.db')

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
  let tmapilUtama = 'welcome to menu utama'

  res.render('index', {tampil:tmapilUtama})
})

//----------------tampil contacts----------------//
app.get('/contacts', function(req, res){
  db.all(`SELECT * FROM contacts`, (err, rows)=>{
    if(!err){
      res.render('contacts', {data: rows})
    }
  })
})

//---------tambah pada contact-------->
app.post('/contacts', (req, res)=>{
  db.run(`INSERT INTO contacts(name, company, phonenumber, email) VALUES('${req.body.name}','${req.body.company}','${req.body.phonenumber}','${req.body.email}')`)
  res.redirect('/contacts')
})

//--------------------tamipil bagian EDIT-----------------//
app.get('/contacts/edit/:id', (req, res) =>{
  db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`, (err, rows) => {
    if(!err){
      res.render('edit', {data:rows})
    }
  })
})
///---------update atau edit-------//
app.post('/contacts/edit/:id', (req, res) => {
  db.run(`UPDATE contacts set name = '${req.body.name}', company = '${req.body.company}', phonenumber = '${req.body.phonenumber}', email = '${req.body.email}' WHERE id = ${req.params.id};`)
  res.redirect('/contacts')
})

//---------------DELETE----------------//
app.get('/contacts/delete/:id', (req, res)=>{
  db.run(`DELETE FROM contacts WHERE id = ${req.params.id}`)
  res.redirect('/contacts')
})

//----------tampil group-------------//
app.get('/groups', (req, res) => {
  db.all(`SELECT * FROM groupCompany`, (err, rows) =>{
    if(!err){
      res.render('groupCompany', {data:rows})
    }
  })
})

//---------tambah pada group---------//
app.post('/groups', (req, res) => {
  db.run(`INSERT INTO groupCompany(name) VALUES('${req.body.name}')`)
  res.redirect('/groups')
})

//------------tampilan bagian edit group---------//
app.get('/groups/edit/:id', (req, res) => {
  db.all(`SELECT * FROM groupCompany WHERE id = ${req.params.id}`, (err, rows) => {
    if(!err){
      res.render('editGroups', {data:rows})
    }
  })
})
//--------------------update group--------------//
app.post('/groups/edit/:id', (req, res)=>{
  db.run(`UPDATE groupCompany SET name='${req.body.name}' WHERE id = ${req.params.id}`)
  res.redirect('/groups')
})

//--------------DELETE----------------//
app.get('/groups/delete/:id', (req, res) => {
  db.run(`DELETE FROM groupCompany WHERE id = ${req.params.id} `)
  res.redirect('/groups')
})
//---------------Tampil address--------------//
app.get('/address', (req, res)=>{
  db.all(`SELECT * FROM address`, (err, rows)=>{
    if(!err){
      res.render('address', {data:rows})
    }
  })
})

//----------------tambah addres-------------//
app.post('/address', (req, res)=>{
  db.run(`INSERT INTO address(street, city) VALUES('${req.body.street}','${req.body.city}')`)
  res.redirect('/address')
})
//--------------tampil edit address----------//
app.get('/address/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM address WHERE id = ${req.params.id}`, (err, rows) => {
    if(!err){
      res.render('editAddress', {data:rows})
    }
  })
})
//-----------update edit address------------//
app.post('/address/edit/:id', (req, res) => {
  db.run(`UPDATE address SET street='${req.body.street}', city='${req.body.city}' WHERE id = ${req.params.id} `)
  res.redirect('/address')
})
//---------delete address---------------------//
app.get('/address/delete/:id', (req, res) => {
  db.run(`DELETE FROM address WHERE id=${req.params.id}`)
  res.redirect('/address')
})

//---------------tampil profile--------------//
app.get('/profile', (req, res)=>{
  db.all(`SELECT * FROM profiles`, (err, rows)=>{
    if(!err){
      res.render('profile', {data:rows})
    }
  })
})

//-------------tambah profile---------------//
app.post('/profile', (req, res)=>{
  db.run(`INSERT INTO profiles(name, password) VALUES ('${req.body.name}','${req.body.password}')`)
  res.redirect('/profile')
})

//--------------tampil Edit profile----------------//
app.get('/profile/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM profiles WHERE id = ${req.params.id}`, (err, rows) => {
    if(!err){
      res.render('editProfile', {data:rows})
    }
  })
})
//------------update edite profile----------//
app.post('/profile/edit/:id', (req, res) => {
  db.run(`UPDATE profiles SET name='${req.body.name}', password='${req.body.password}' WHERE id = ${req.params.id}`)
  res.redirect('/profile')
})

//-----------Delete profile---------------------//
app.get('/profile/delete/:id', (req, res)=>{
  db.run(`DELETE FROM profiles WHERE id = ${req.params.id}`)
  res.redirect('/profile')
})

app.listen(3222, function(){
  console.log('sedang berjalan .......');
})
