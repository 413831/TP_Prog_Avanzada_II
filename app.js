const express = require('express');
const app = express();
const db = require('./src/models');
const PORT = 3001;
const subscriptionRoutes = require('./src/routes/subscriptionRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const mainRoutes = require('./src/routes/mainRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');


app.use(express.json());

// config template engines
app.set('view engine','ejs');
app.set('views','./src/views')

// routes
app.get('/ping',(req, res) => res.send('pong'));

app.use('/plans', subscriptionRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/', mainRoutes);

// Sincronizamos el modelo con la base de datos y arrancamos el servidor
db.sequelize.sync()
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });
