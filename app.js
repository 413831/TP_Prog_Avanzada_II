const express = require('express');
const app = express();
const PORT = 3001;
const subscriptionRoutes = require('./src/routes/subscriptionRoutes.js');
const usuariosRoutes = require('./src/routes/usuariosRoutes.js');
const mainRoutes = require('./src/routes/mainRoutes.js');

app.use(express.urlencoded());
app.use(express.json());

// config template engines
app.set('view engine','ejs');
app.set('views','./src/views')

// routes
app.get('/ping',(req, res) => res.send('pong'));

app.use('/plans', subscriptionRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/', mainRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));