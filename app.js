const express = require('express');
const app = express();
const PORT = 3001;
const fs = require('fs');
const audiosRoutes = require('./src/routes/audiosRoutes.js');
const usuariosRoutes = require('./src/routes/usuariosRoutes.js');

app.use(express.urlencoded());
app.use(express.json());

// routes
app.get('/ping',(req, res) => res.send('pong'));

app.get('/',(req, res) => res.send('Bienvenido \n <h2>Presentación Rutas</h2>'));

app.get('/home',(req, res) => {
    res.sendFile(__dirname+'/public/pages/index.html');
});

app.use('/media', audiosRoutes);
app.use('/usuarios', usuariosRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));