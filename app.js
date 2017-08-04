const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log("Listenin on port 3000");
})
