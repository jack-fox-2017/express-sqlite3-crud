var sql = require('sqlite3').verbose()
var db = new sql.Database('./db/data.db')


// CREATE TABLE table_name (
//     column1 datatype,
//     column2 datatype,
//     column3 datatype,
//    ....
// );

// SOAL
// - Release 0
// 1. Buatlah file dengan nama setup.js yang akan dijalankan pertama kali untuk membuat
// table pada database. Tentukan column mana saja yang akan di set unique.
// 2. Berikan validasi di setiap create table sehingga meskipun setup dijalankan berulang
// kali, tidak error

// SOURCE CODE EXAMPLE (materi)

// CREATE DATABASE [IF NOT EXISTS] nama_database
// Format [IF NOT EXISTS] akan membuat database jika database itu belum ada sebelumnya.
// Jika sudah ada,  query CREATE DATABASE tidak akan menghasilkan apa-apa (database yang lama tidak akan tertimpa).
// contoh query:
// mysql> CREATE DATABASE IF NOT EXISTS mahasiswa;
// Query OK, 1 row affected, 1 warning (0.00 sec)
// MENGHAPUS/DELETE DATABASE:
// DROP DATABASE [IF EXISTS] database_name;
// Pake [IF EXISTS] biar ngga error ketika mencoba menghapus database/tabel yang memang sudah tidak ada
// UPDATE :
// INSERT INTO
// AUTO INCREMENT ------>attribute data(aturan yang kita terapkan untuk sebuah kolom): AUTO_INCREMENT, BINARY, DEFAULT, NOT NULL, NULL, SIGNED, UNSIGNED, dan ZEROFILL.
// Atribut AUTO_INCREMENT digunakan untuk tipe data numerik (biasanya tipe data INT),
// dimana jika kita menetapkan sebuah kolom dengan atribut AUTO_INCREMENT,
// maka setiap kali kita menginputkan data,
// nilai pada kolom ini akan bertambah 1. Nilai pada kolom tersebut juga akan bertambah jika kita input dengan NULL  atau nilai 0.
// Pada sebuah tabel, hanya 1 kolom yang dapat dikenai atribut AUTO_INCREMENT. Setiap kolom AUTO_INCREMENT juga akan dikenakan atribut NOT NULL secara otomatis.
// Kolom AUTO_INCREMENT juga harus digunakan sebagai KEY (biasanya PRIMARY KEY)
// INTEGER dan INT sama aja?//? AUTO_INCREMENT ga bsa pake INT...
// CHAR untuk yang jml karakter tetap, varchar untuk yang berubah2 sesuai isi, bedanya di jumlah byte penyimpanan data, varchar bisa lebih irit
// callback: db.run , db.all, db.prepare??, db.each???

// SOAL LAGI
// Structure table:
// * Contacts: id type integer, name type string, company type string, telp_number type string, email type string
// * Groups: id type integer, name_of_group type string

function createContactsTable(){
  db.run(`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), company VARCHAR(50), telp_number VARCHAR(50), email VARCHAR(50))`)
}

function createGroupsTable(){
  db.run(' CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(50))');
}

function createAddressesTable(){
  db.run('CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, jalan VARCHAR(50), kota VARCHAR(50), provinsi VARCHAR(50))')
}

function createProfileTable(){
  db.run('CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, usia VARCHAR(2), pendidikan VARCHAR(50), pengalaman VARCHAR(250))')
}



createContactsTable()
createGroupsTable()
createAddressesTable()
createProfileTable()
