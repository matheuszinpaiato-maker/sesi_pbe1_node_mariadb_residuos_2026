const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nome_do_banco_de_dados'
})

module.exports = connection