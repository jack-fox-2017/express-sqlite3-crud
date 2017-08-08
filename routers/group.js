'use strict'

const express = require('express');
const router = express.Router();

const DbModel = require('../models/dbModels');
const Groups = require('../models/group');
// const ContactGroups = require('../models/contactGroups');

let dbModel = new DbModel('./db/data.db');

const connection = dbModel.connection;

router.get('/', function(req,res) {
  Groups.findAll(connection, function(rows) {
      res.render('group', {data: rows});
  })
});

router.post('/', function(req,res) {
  Groups.insertData(connection, req.body);
  res.redirect('/groups');
})


router.get('/edit/:id', function(req, res){
  Groups.findById(connection, req.params.id, function(rows) {
    res.render('groupEdit', {data: rows});
  })
})

router.post('/edit/:id', function(req, res){
  Groups.updateData(connection, req.body, req.params.id);
  res.redirect('/groups');
})

router.get('/contact/:id', function(req, res){
  Groups.findById(connection, req.params.id, function(rows) {
    // console.log(rows+'ini data rows');
    Groups.showContact(connection, function(rows2) {
      // console.log(rows2+ 'ini data rows2');
        res.render('groupContact', {data_group: rows, data_contact: rows2});
    })
  })
});

router.post('/contact/:id', function(req, res){
  Groups.insertDataConjuction(connection, req.body, req.params.id);
  res.redirect('/groups');
})

router.get('/delete/:id', function(req, res){
  Groups.removeData(connection, req.params.id);
  res.redirect('/groups');
});

module.exports = router;
// function manipulateGroups(conn, rows,cb) {
//   let hitung = 0;
//
//   rows.forEach(row =>{
//       db.all(`SELECT groups_id, contacts_id, name_of_group FROM ContactGroups
//         JOIN Groups
//         ON ContactGroups.groups_id = Groups.id
//         WHERE ContactGroups.contacts_id = ${row.id}`,(err, data_contactsingroup) => {
//
//           if (!err && data_contactsingroup.length>0) {
//             // row['contact_id'] = rows.id
                // row['contact_name']=rows.name;
                // row['telp_number']=rows.telp_number;
                // row['company']=rows.company;
                // row['email']=rows.email;
//             console.log(data_contactsingroup);
//             console.log(JSON.stringify(row)+'this is row');
//             var arr=[]
//               for (let i=0; i<data_contactsingroup.length; i++) {
//                 arr.push(data_contactsingroup[i].name_of_group);
//               }
//             row['group_names']=arr;
//           }
//         hitung++;
//         if(hitung == rows.length) {
//           console.log(rows);
//           cb(rows);
//         }
//
//       }
//     )
//   })
// }
//
// app.get('/', function(req, res){
//   db.all(`SELECT * FROM Contacts`, function (err, dGroup) {
//     manipulateGroups(dGroup, (dataManipulated)=> {
//       // console.log(dataManipulated);
//       res.render('contact', {data: dataManipulated});
//     })
//   })
// });
//
//
// app.post('/', function(req,res) {
//   db.run(`INSERT INTO Groups (
//     name_of_group
//   ) VALUES ('${req.body.name_of_group}')`);
//   res.redirect('/groups');
// })
//
//
// app.get('/edit/:id', function(req, res){
//   db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`, function (err, rows) {
//     if(!err) {
//       res.render('groupEdit', {data: rows});
//     }
//   })
// })
//
// app.post('/edit/:id', function(req, res){
//   db.run(`UPDATE Groups SET
//     name_of_group = '${req.body.name_of_group}'`);
//   res.redirect('/groups');
// })
//
// app.get('/contact/:id', function(req, res){
//   db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`, function (err, rows) {
//     db.all(`SELECT * FROM Contacts`, function (err, rows2) {
//     if(!err) {
//       res.render('groupContact', {data_group: rows, data_contact: rows2});
//     }
//     })
//   })
// });
//
// app.post('/contact/:id', function(req, res){
//   db.run(`INSERT INTO ContactGroups (
//     groups_id,
//     contacts_id
//   ) VALUES ('${req.params.id}','${req.body.contacts_id}')`);
//   res.redirect('/groups');
// })
//
// app.get('/delete/:id', function(req, res){
//   db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`);
//   res.redirect('/groups');
// });
//
// module.exports = app;

// module.exports = Group;
