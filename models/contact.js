function deletecont(conn, id) {
  return new Promise((resolve, reject) => {
    conn.run(`DELETE FROM contacts WHERE id = ${id};`, function () {
      resolve(true)
    })
  })
}


function deleteall(conn, id) {
  return new Promise((resolve, reject) => {
    conn.run(`DELETE FROM bridge WHERE contact_id = ${id};`, function () {
      resolve(true)
    })
  })
}

class Contact {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.phone = data.telp_number;
    this.email = data.email;
  }

  getContact(conn, callback) {
    conn.all(`select contacts.id, contacts.name, contacts.company, contacts.email, contacts.telp_number, bridge.contact_id, bridge.group_id, groups.name_of_group, addresses.alamat, addresses.contacts_id, addresses.kodepos
      from contacts left join bridge on contacts.id = bridge.contact_id
      left join groups on bridge.group_id = groups.id
      left join addresses on contacts.id = addresses.contacts_id`, function (err, rows) {
      if (!err) {
        callback(false, rows)
      }
    })
  }



  addContact(conn, name, company, telp, email) {
    conn.run(`INSERT INTO contacts (name, company, telp_number, email)
      VALUES ('${name}', '${company}', '${telp}', '${email}');`)
  }

  getContactE(conn, where, callback) {
    conn.all(`select * from contacts where id = ${where}`, function (err, rows) {
      if (!err) {
        callback(false, rows)
      }
    })
  }

  updateContact(conn, name, company, telp, email, id) {
    conn.run(`UPDATE contacts SET name = '${name}', company = '${company}', telp_number = '${telp}', email = '${email}'  WHERE id = ${id};`)
  }

  deleteContact(conn, id) {
    deletecont(conn, id)
      .then(function (par) {
        deleteall(conn, id)
          .then(function (conn, id) {})
      })
  }
}

module.exports = Contact
