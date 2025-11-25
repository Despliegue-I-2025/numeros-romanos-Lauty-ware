const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/a2r', require('./a2r'));
app.use('/r2a', require('./r2a'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Números Romanos funcionando' });
});

module.exports = app;