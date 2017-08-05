const express = require('express')
let router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')

router.get('/', (req, res) => {
  db.all(`SELECT * FROM profiles`, (err, rows) => {
    if (err) throw err
    res.render('profiles', {data: rows})
  })
})

router.post('/', (req, res) => {
  db.run(`INSERT INTO profiles (username, password) VALUES (
    '${req.body.username}',
    '${req.body.password}'
  )`)

  res.redirect('/profiles')
})

router.get('/edit/:id', (req, res) => {
  db.all(`SELECT * FROM profiles WHERE id=${req.params.id}`, (err, rows) => {
    if (err) throw err
    res.render('profiles-edit', {data: rows})
  })
})

router.post('/edit/:id', (req, res) => {
  db.run(`UPDATE profiles SET
    username = '${req.body.username}',
    password = '${req.body.password}'
  WHERE id = ${req.params.id}`)

  //

  res.redirect('/profiles')
})

router.get('/delete/:id', (req, res) => {
  db.run(`DELETE FROM profiles WHERE id = ${req.params.id}`)
  res.redirect('/profiles')
})

module.exports = router
