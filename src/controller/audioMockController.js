const { getAll } = require('../models/audioModel')

module.exports = {
    getAll: async (req, res ) => getAllAudios(req,res),
    getByID: (req, res ) => getAudioByID(req,res),
    upload: (req, res ) => createAudio(req,res), 
    modify: (req, res ) => modifyAudio(req,res), 
    delete: (req, res ) => deleteAudio(req,res), 
}


async function getAllAudios(req, res) {
    //const getAudios = fs.readFileSync("./data/audios.json");
  
    //res.status(200).send(JSON.parse(getAudios));
    const data = await getAll();

    res.send(data);
}

function getAudioByID(req, res) {
        const id = parseInt(req.params.id, 10);

        const getAudios = fs.readFileSync("./data/audios.json");

        const audiosArray = JSON.parse(getAudios);

        let audioRes = null;

        audiosArray.forEach((audio) => {
            if (audio.id === id) {
                audioRes = audio;
            }
        });

        if (audioRes) {
            res.status(200).json(audioRes);
        } else {
            res
                .status(404)
                .json({ message: `El audio con id ${id} no se ha encontrado` });
        }
}

function createAudio(req, res) {
    const newAudio = req.body;
  
    let audiosArray;
  
    try {
      const data = fs.readFileSync("./data/audios.json");
      audiosArray = JSON.parse(data);
    } catch (error) {
      return res.status(500).json({ message: "Error leyendo el archivo JSON" });
    }
  
    audiosArray.push(newAudio);
  
    try {
      fs.writeFileSync(
        "./data/audios.json",
        JSON.stringify(audiosArray, null, 2)
      );
      res.status(200).json({ message: "Audio agregado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error escribiendo en el archivo JSON" });
    }
}

function modifyAudio(req, res) {
    const audioId = parseInt(req.params.id, 10); // Obtener el id del parámetro de la URL
    const updatedAudio = req.body; // Obtener los datos actualizados del cuerpo de la solicitud
  
    if (isNaN(audioId)) {
      return res.status(400).json({ message: "ID inválido" });
    }
  
    let audiosArray;
  
    try {
      const data = fs.readFileSync("./data/audios.json", "utf-8");
      audiosArray = JSON.parse(data);
    } catch (error) {
      return res.status(500).json({ message: "Error leyendo el archivo JSON" });
    }
  
    const index = audiosArray.findIndex((audio) => audio.id === audioId);
  
    if (index === -1) {
      return res
        .status(404)
        .json({ message: `El audio con ID ${audioId} no se ha encontrado` });
    }
  
    // Actualizar el audio encontrado
    audiosArray[index] = { ...audiosArray[index], ...updatedAudio };
  
    try {
      fs.writeFileSync(
        "./data/audios.json",
        JSON.stringify(audiosArray, null, 2),
        "utf-8"
      );
      res.status(200).json({ message: "Audio actualizado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error escribiendo en el archivo JSON" });
    }
}

function deleteAudio() {
    const audioId = parseInt(req.params.id, 10); // Obtener el id del parámetro de la URL

    if (isNaN(audioId)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    let audiosArray;

    try {
        const data = fs.readFileSync("./data/audios.json", "utf-8");
        audiosArray = JSON.parse(data);
    } catch (error) {
        return res.status(500).json({ message: "Error leyendo el archivo JSON" });
    }

    const newAudiosArray = audiosArray.filter((audio) => audio.id !== audioId);

    if (newAudiosArray.length === audiosArray.length) {
        return res
            .status(404)
            .json({ message: `El audio con ID ${audioId} no se ha encontrado` });
    }

    try {
        fs.writeFileSync(
            "./data/audios.json",
            JSON.stringify(newAudiosArray, null, 2),
            "utf-8"
        );
        res.status(200).json({ message: "Audio eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error escribiendo en el archivo JSON" });
    }
}