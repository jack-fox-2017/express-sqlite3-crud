const express = require('express')
let router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')

router.get('/', (req, res) => {
  db.all(`SELECT * FROM addresses`, (err, rows) => {
    if (err) throw err
    res.render('addresses', {data: rows})
  })
})

router.post('/', (req, res) => {
  db.run(`INSERT INTO addresses (street, city, province, zip) VALUES (
    '${req.body.street}',
    '${req.body.city}',
    '${req.body.province}',
    '${req.body.zip}'
  )`)

  res.redirect('/addresses')
})

router.get('/edit/:id', (req, res) => {
  db.all(`SELECT * FROM addresses WHERE id=${req.params.id}`, (err, rows) => {
    if (err) throw err
    res.render('addresses-edit', {data: rows})
  })
})

router.post('/edit/:id', (req, res) => {
  db.run(`UPDATE addresses SET
    street = '${req.body.street}',
    city = '${req.body.city}',
    province = '${req.body.province}',
    zip = '${req.body.zip}'
  WHERE id = ${req.params.id}`)

  //

  res.redirect('/addresses')
})

router.get('/delete/:id', (req, res) => {
  db.run(`DELETE FROM addresses WHERE id = ${req.params.id}`)
  res.redirect('/addresses')
})

module.exports = router
