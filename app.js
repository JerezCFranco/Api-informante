const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let noticias = [];
let nextId = 1;

// Endpoint para obtener todas las noticias
app.get('/api/noticias', (req, res) => {
  res.json(noticias);
});

// Endpoint para crear una nueva noticia
app.post('/api/noticias', (req, res) => {
  // Obtener la fecha y hora actual en Argentina
  const fechaHoraArgentina = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
  
  const nuevaNoticia = {
    id: nextId++,
    fechaCreacion: fechaHoraArgentina, // Agrega la fecha y hora actual de Argentina al crear la noticia
    ...req.body
  };
  noticias.push(nuevaNoticia);
  res.status(201).json(nuevaNoticia);
});

// Endpoint para actualizar una noticia por su ID
app.put('/api/noticias/:id', (req, res) => {
  const id = req.params.id;
  const noticiaActualizada = req.body;
  const indice = noticias.findIndex(noticia => noticia.id === parseInt(id)); // Buscar el índice de la noticia por su ID

  if (indice !== -1) {
    noticias[indice] = { ...noticias[indice], ...noticiaActualizada };
    res.json(noticias[indice]);
  } else {
    res.status(404).json({ error: 'Noticia no encontrada' });
  }
});

// Endpoint para borrar una noticia por su ID
app.delete('/api/noticias/:id', (req, res) => {
  const id = req.params.id;
  const indice = noticias.findIndex(noticia => noticia.id === parseInt(id)); // Buscar el índice de la noticia por su ID

  if (indice !== -1) {
    noticias.splice(indice, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Noticia no encontrada' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
