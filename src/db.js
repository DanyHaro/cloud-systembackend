const mysql = require('mysql2');

// Configuración de la conexión a MySQL
/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'cloud_matriculadb'
});*/

// Configuración de la conexión al servidor Mariadb
const connection = mysql.createConnection({
  host: '192.168.99.10',
  user: 'admin',
  password: '123',
  database: 'cloudmatriculadb'
});

// Conexión
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos.');
});

module.exports = connection;
