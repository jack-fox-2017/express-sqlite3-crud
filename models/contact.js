'use strict'

class Contacts {
  constructor() {

  }

  static joinConjunctionWithGroups(conn,row){
    return new Promise(function(resolve, reject) {
      var data_contactsingroup=[];
        conn.each(`SELECT groups_id, contacts_id, name_of_group FROM ContactGroups
          JOIN Groups
          ON ContactGroups.groups_id = Groups.id
          WHERE ContactGroups.contacts_id = ${row.id}`,(err, data_perObject) => {
            // console.log('data_perObject brahh'+JSON.stringify(data_perObject));
            data_contactsingroup.push(data_perObject);
        }, function (err){
          // console.log('data_contactsingroup'+ JSON.stringify(data_contactsingroup));
          if(!err){
            resolve(data_contactsingroup)
          } else {
            reject(err);
          }
        })
      })
  };

  static findAll(conn) { // uda pake Promise gk perlu callback
    return new Promise(function(resolve, reject) {
      var temp = [];
      conn.each(`SELECT * FROM Contacts`, function (err, dGroup) {
        temp.push(dGroup);
      }, function (err){
        // console.log('---err'+temp);

        if(!err){
          resolve(temp)
        } else {
          reject(err);
        }
      })
    })
  };

      // var temp = [];
      // conn.each(`SELECT * FROM Contacts`, function (err, dGroup) {
      //   temp.push(dGroup);
      // }, function (){
      //     cb(temp);
      //   })
      // return new Promise(function(resolve, reject) {
      //   var temp = [];
      //   conn.each(`SELECT * FROM Contacts`, function (err, dGroup) {
      //     temp.push(dGroup);
      //   }
      // })


  static findById(conn, id) {
    return new Promise(function(resolve, reject) {
      var temp = [];
      conn.each(`SELECT * FROM Contacts WHERE id = ${id}`, function (err, rows) {
        temp.push(rows);
      }, function(err) {
        if(!err){
          resolve(temp)
        } else {
          reject(err);
        }
      })
    });
  }

  static insertData(conn, data){
    conn.run(`INSERT INTO Contacts (
      name,
      company,
      telp_number,
      email
    ) VALUES ('${data.name}','${data.company}', '${data.telp_number}', '${data.email}')`, function(){
      if(data.hasOwnProperty('groups_id')) {
        let contacts_id = this.lastID;
        conn.run(`INSERT INTO ContactGroups (
          contacts_id,
          groups_id
        ) VALUES (${contacts_id},'${data.groups_id}')`);
      }

    });
  }

  // static insertDataConjuction(conn, data, id){
  //   conn.run(`INSERT INTO ContactGroups (
  //     groups_id,
  //     contacts_id
  //   ) VALUES ('${id}','${data.contacts_id}')`);
  // }

  // static showContact(conn, cb){
  //   new new Promise(function(resolve, reject) {
  //
  //   });
  //     var temp = [];
  //     conn.each(`SELECT * FROM Contacts`, function (err, rows2) {
  //       temp.push(rows2)
  //     }, function(){
  //       cb(temp)
  //     })
  // }

  static removeData(conn, id){
    conn.run(`DELETE FROM Contacts WHERE id = ${id}`);
  }

  static updateData(conn, data, id){
    conn.run(`UPDATE Contacts SET
      name = '${data.name}',
      company = '${data.company}',
      telp_number = '${data.telp_number}',
      email = '${data.email}'
      WHERE id = '${id}';`);
  }

  // static showGroup(conn, cb){
  //     conn.all(`SELECT * FROM Groups`, function (err, rows2) {
  //       if(!err) {
  //         cb(rows2)
  //       } else {
  //         cb(null)
  //       }
  //     })
  // }


}

module.exports = Contacts;
