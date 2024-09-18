const express = require('express')
const app = express()
const PORT = 3001;
const fs = require('fs');

const audiosRoutes = require('./src/routes/audiosRoutes.js');

app.use(express.json());

// routes
app.get('/ping',(req, res) => res.send('pong'));

app.get('/',(req, res) => res.send('Bienvenido \n <h2>Presentación Rutas</h2>'));

app.get('/home',(req, res) => {
    res.sendFile(__dirname+'/public/pages/index.html');
});

app.get('/audios',(req, res) => {
    
    const getAudios = fs.readFileSync(__dirname+'/data/audios.json');
    
    res.status(200).send(JSON.parse(getAudios));
});

// params ruta
app.get('/audios/:id', (req,res) => {
    
    const id = parseInt(req.params.id, 10);

    const getAudios = fs.readFileSync(__dirname+'/data/audios.json');

    const audiosArray = JSON.parse(getAudios);

    let audioRes = null;

    audiosArray.forEach(audio => {
        if(audio.id === id) {
            audioRes = audio;
        }  
    });

    if(audioRes) {
        res.status(200).json(audioRes);
    }
    else {
        res.status(404).json({message:`El audio con id ${id} no se ha encontrado`});
    }
});

// query params
app.get('/filtrarPorDuracion/query', (req,res) => {
    
    const duracion = parseInt(req.query.duracion, 10);

    console.log('Duracion:', duracion);

    if (isNaN(duracion)) {
        return res.status(400).json({ message: 'El parámetro duracion debe ser un número válido' });
    }

    const getAudios = fs.readFileSync(__dirname+'/data/audios.json');

    const audiosArray = JSON.parse(getAudios);

    const audioRes = audiosArray.filter(audio => audio.duracion <= duracion);

    res.status(200).json(audioRes);
});


app.use('/', audiosRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));