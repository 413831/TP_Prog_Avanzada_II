const express = require('express')
const app = express()

// routes
app.get('/ping',(req, res) => res.send('pong').status(200));

app.get('/',(req, res) => res.send('Bienvenido').status(200));

app.post('/audio',(req, res) => {
    const payload = req.body;

    console.log(payload);

    res.status(200)
});

app.get('/audio/',(req, res) => {
    audios = [{
        
    }]

    res.status(200)
});








app.listen(3001, () => console.log("server running at port 3001"));