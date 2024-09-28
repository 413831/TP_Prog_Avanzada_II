const express = require('express');
const router = express.Router();

const fs = require('fs');

router.get('/usuarios',(req, res) => {
    
    const getUsuario = fs.readFileSync('./data/usuarios.json');
    
    res.status(200).send(JSON.parse(getUsuario));
});

router.get('/usuarios/:id', (req,res) => {
    
    const id = parseInt(req.params.id, 10);

    const getUsuario = fs.readFileSync('./data/usuarios.json');

    const usuariosArray = JSON.parse(getUsuario);

    let audioRes = null;

    usuariosArray.forEach(audio => {
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

router.post('/usuarios', (req,res) => {

    const newAudio = req.body; 

    let usuariosArray;

    try {
        const data = fs.readFileSync('./data/usuarios.json');
        usuariosArray = JSON.parse(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error leyendo el archivo JSON'});
    }

    usuariosArray.push(newAudio);

    try {
        fs.writeFileSync('./data/usuarios.json', JSON.stringify(usuariosArray, null, 2));
        res.status(200).json({ message: 'Audio agregado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error escribiendo en el archivo JSON' });
    }
});

router.put('/usuarios/:id', (req, res) => {
    const audioId = parseInt(req.params.id, 10); // Obtener el id del parámetro de la URL
    const updatedAudio = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

    if (isNaN(audioId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    let usuariosArray;

    try {
        const data = fs.readFileSync('./data/usuarios.json', 'utf-8');
        usuariosArray = JSON.parse(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error leyendo el archivo JSON' });
    }

    const index = usuariosArray.findIndex(audio => audio.id === audioId);

    if (index === -1) {
        return res.status(404).json({ message: `El audio con ID ${audioId} no se ha encontrado` });
    }

    // Actualizar el audio encontrado
    usuariosArray[index] = { ...usuariosArray[index], ...updatedAudio };

    try {
        fs.writeFileSync('./data/usuarios.json', JSON.stringify(usuariosArray, null, 2), 'utf-8');
        res.status(200).json({ message: 'Audio actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error escribiendo en el archivo JSON' });
    }
});

router.delete('/usuarios/:id', (req, res) => {
    const audioId = parseInt(req.params.id, 10); // Obtener el id del parámetro de la URL

    if (isNaN(audioId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    let usuariosArray;

    try {
        const data = fs.readFileSync('./data/usuarios.json', 'utf-8');
        usuariosArray = JSON.parse(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error leyendo el archivo JSON' });
    }

    const newUsuarioArray = usuariosArray.filter(audio => audio.id !== audioId);

    if (newUsuarioArray.length === usuariosArray.length) {
        return res.status(404).json({ message: `El audio con ID ${audioId} no se ha encontrado` });
    }

    try {
        fs.writeFileSync('./data/usuarios.json', JSON.stringify(newUsuarioArray, null, 2), 'utf-8');
        res.status(200).json({ message: 'Audio eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error escribiendo en el archivo JSON' });
    }
});

module.exports = router;