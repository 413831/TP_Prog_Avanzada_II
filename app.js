const express = require('express');
const session = require('express-session');
const app = express();
const db = require('./src/models');
const mongodb  = require('./src/config/mongoconn.js');
const cors = require('cors');
const PORT = 3001;
const tasksRoutes = require('./src/routes/tasksRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const userRoutes = require('./src/routes/usersRoutes.js');

app.use(express.json());

// Permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:5173', // Cambia al puerto del frontend si es necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true // Si necesitas enviar cookies o headers específicos
}));

// config template engines
app.set('view engine','ejs');
app.set('views','./src/views')

// session
app.use(session({
  secret: "LOGIN",
  resave: false,
  saveUninitialized: true,
}));

// routes
app.get('/ping',(req, res) => res.send('pong'));

app.use('/api', tasksRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

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
