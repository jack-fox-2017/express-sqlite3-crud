var sql3 = require('sqlite3').verbose();
var db = new sql3.Database('./db/data.db')


function  createTable(){
db.run('CREATE TABLE CITIES (id INT, kota VARCHAR(50), province VARCHAR(50), gubernur VARCHAR(50))')
console.log(('table done'));
};

// function insertData(){
//
// }


INSERT INTO nama_table(id, kota, province, gubernur) VALUES(1, 'Bandung', 'Jawa Barat', 'Tama')

createTable();



//UPDATE nama_table SET nama_column = 'valuebaru', nama_column2(jikadiperlukan)='valuebaru' WHERE condition kalian mau gimana
// function updateTable(){
//   db.run(`UPDATE CITIES SET kota = 'Semarang', province ='Jateng', Where id =2;`)
// }

// function deleteTable() {
//   db.run(`DELETE FROM CITIES WHERE id =2`)
// }

// deleteTable()
