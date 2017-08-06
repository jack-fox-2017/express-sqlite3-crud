var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var database = require('./setup');
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/database.db');

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));
//sett database and checkit up
app.get('/setupdb', function(req, res){
	database()
	res.send('Berhasil setup database')
})

app.get('/createDbAddress', function(req, res){
	db.run(`CREATE TABLE IF NOT EXISTS Address(id INTEGER PRIMARY KEY AUTOINCREMENT, street_name varchar(255), city varchar(255), province varchar(255), zipcodes varchar(25))`)
	res.send('Succes create Address Table')
})

app.get('/createDbProfile', function(req, res){
	db.run(`CREATE TABLE IF NOT EXISTS Profile(id INTEGER PRIMARY KEY AUTOINCREMENT, nickname varchar(255), account varchar(255))`)
	res.send('Succes create Profile Table')
})

//halaman index route
app.get('/', function(req, res){
	res.render('index')
})

//contact route
app.get('/contact', function(req, res){
	db.all(`SELECT * FROM Contact`, function(err, rows){
		res.render('contact', {contact_data : rows})
	})
})

app.get('/addContact', function(req, res){
	res.render('addContact')
})

app.post('/addContact', function(req, res){
	db.run(`INSERT INTO Contact(name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`)
 	res.redirect('/contact');
})

app.get('/contact/edit/:id', function (req, res){
	db.all(`SELECT * FROM Contact WHERE id = '${req.params.id}'`, function(err, rows){
		res.render('editContact', {edit_contact: rows});
	});
});

app.post('/contact/edit/:id', function(req, res){
	db.run(`UPDATE Contact SET name ='${req.body.name}', company = '${req.body.company}',telp_number ='${req.body.telp_number}',email ='${req.body.email}' WHERE id = '${req.params.id}'`)
	res.redirect('/contact')
});

app.get('/contact/delete/:id', function (req, res) {
	db.run(`DELETE FROM Contact WHERE id = '${req.params.id}' `, function(err, rows){
		res.redirect('/contact');
	});
});


//group route
app.get('/groups', function(req, res){
	db.all(`SELECT * FROM Groups`, function(err, rows){
		res.render('groups', {groups_data : rows})
	})
})

app.get('/addGroups', function(req, res){
	res.render('addGroups')
})

app.post('/addGroups', function(req, res){
	db.run(`INSERT INTO Groups(name_group) VALUES ('${req.body.name_group}')`)
	res.redirect('/groups')
})

app.get('/groups/edit/:id', function(req, res){
	db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}'`, function(err, rows){
		res.render('editGroups', {edit_groups: rows})
	})
})

app.post('/groups/edit/:id', function(req, res){
	db.run(`UPDATE Groups SET name_group = '${req.body.name_group}' WHERE id = '${req.params.id}'`)
	res.redirect('/groups')
})

app.get('/groups/delete/:id', function(req, res){
	db.run(`DELETE FROM Groups WHERE id = '${req.params.id}'`, function(err, rows){
		res.redirect('/groups')
	})
})

//address route
app.get('/address', function(req, res){
	db.all(`SELECT * FROM Address`, function(err, rows){
		res.render('address', {address_data: rows})
	})
})

app.get('/addAddress', function(req, res){
	res.render('addAddress')
})

app.post('/addAddress', function(req, res){
	db.run(`INSERT INTO Address(street_name, city, province, zipcodes) VALUES ('${req.body.street_name}', '${req.body.city}', '${req.body.province}', '${req.body.zipcodes}')`)
	res.redirect('/address')
})

app.get('/address/edit/:id', function(req, res){
	db.all(`SELECT * FROM Address WHERE id = '${req.params.id}'`, function(err, rows){
		res.render('editAddress', {edit_address : rows})
	})
})

app.post('/address/edit/:id', function(req, res){
	db.run(`UPDATE Address SET street_name = '${req.body.street_name}', city = '${req.body.city}', province = '${req.body.province}', zipcodes = '${req.body.zipcodes}' WHERE id = '${req.params.id}'`)
	res.redirect('/address')
})

app.get('/address/delete/:id', function(req, res){
	db.run(`DELETE FROM Address WHERE id = '${req.params.id}'`, function(err, rows){
		res.redirect('/address')
	})
})

//profile route
app.get('/profile', function(req, res){
	db.all(`SELECT * FROM Profile`, function(err, rows){
		res.render('profile', {profile_data: rows})
	})
})

app.get('/addProfile', function(req, res){
	res.render('addProfile')
})

app.post('/addProfile', function(req, res){
	db.run(`INSERT INTO Profile(nickname, account) VALUES ('${req.body.nickname}', '${req.body.account}')`)
	res.redirect('/profile')
})

app.get('/profile/edit/:id', function(req, res){
	db.all(`SELECT * FROM Profile WHERE id = '${req.params.id}'`, function(err, rows){
		res.render('editProfile', {edit_profile : rows})
	})
})

app.post('/profile/edit/:id', function(req, res){
	db.run(`UPDATE Profile SET nickname = '${req.body.nickname}', account = '${req.body.account}' WHERE id = '${req.params.id}'`)
	res.redirect('/profile')
})

app.get('/profile/delete/:id', function(req, res){
	db.run(`DELETE FROM Profile WHERE id = '${req.params.id}'`, function(err, rows){
		res.redirect('/profile')
	})
})


app.listen(3000, function(){
	console.log('Iam listen on port 3000')
})
