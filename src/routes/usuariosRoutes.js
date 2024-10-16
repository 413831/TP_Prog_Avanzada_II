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

    let SubscriptionRes = null;

    usuariosArray.forEach(Subscription => {
        if(Subscription.id === id) {
            SubscriptionRes = Subscription;
        }  
    });

    if(SubscriptionRes) {
        res.status(200).json(SubscriptionRes);
    }
    else {
        res.status(404).json({message:`El Subscription con id ${id} no se ha encontrado`});
    }
});

router.post('/usuarios', (req,res) => {

    const newSubscription = req.body; 

    let usuariosArray;

    try {
        const data = fs.readFileSync('./data/usuarios.json');
        usuariosArray = JSON.parse(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error leyendo el archivo JSON'});
    }

    usuariosArray.push(newSubscription);

    try {
        fs.writeFileSync('./data/usuarios.json', JSON.stringify(usuariosArray, null, 2));
        res.status(200).json({ message: 'Subscription agregado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error escribiendo en el archivo JSON' });
    }
});

router.put('/usuarios/:id', (req, res) => {
    const SubscriptionId = parseInt(req.params.id, 10); // Obtener el id del parámetro de la URL
    const updatedSubscription = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

    if (isNaN(SubscriptionId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    let usuariosArray;

    try {
        const data = fs.readFileSync('./data/usuarios.json', 'utf-8');
        usuariosArray = JSON.parse(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error leyendo el archivo JSON' });
    }

    const index = usuariosArray.findIndex(Subscription => Subscription.id === SubscriptionId);

    if (index === -1) {
        return res.status(404).json({ message: `El Subscription con ID ${SubscriptionId} no se ha encontrado` });
    }

    // Actualizar el Subscription encontrado
    usuariosArray[index] = { ...usuariosArray[index], ...updatedSubscription };

    try {
        fs.writeFileSync('./data/usuarios.json', JSON.stringify(usuariosArray, null, 2), 'utf-8');
        res.status(200).json({ message: 'Subscription actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error escribiendo en el archivo JSON' });
    }
});

router.delete('/usuarios/:id', (req, res) => {
    const SubscriptionId = parseInt(req.params.id, 10); // Obtener el id del parámetro de la URL

    if (isNaN(SubscriptionId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    let usuariosArray;

    try {
        const data = fs.readFileSync('./data/usuarios.json', 'utf-8');
        usuariosArray = JSON.parse(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error leyendo el archivo JSON' });
    }

    const newUsuarioArray = usuariosArray.filter(Subscription => Subscription.id !== SubscriptionId);

    if (newUsuarioArray.length === usuariosArray.length) {
        return res.status(404).json({ message: `El Subscription con ID ${SubscriptionId} no se ha encontrado` });
    }

    try {
        fs.writeFileSync('./data/usuarios.json', JSON.stringify(newUsuarioArray, null, 2), 'utf-8');
        res.status(200).json({ message: 'Subscription eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error escribiendo en el archivo JSON' });
    }
});

module.exports = router;