// Importa Express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const matriculaRoutes = require('./src/routes/matriculaRoutes.js');

app.use(bodyParser.json());
app.use('/matricula', matriculaRoutes);  // Usando las rutas definidas en el archivo matriculaRoutes.js

// Ruta principal
app.get('/home', (req, res) => {
  res.send('¡Hola, Mundo!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
