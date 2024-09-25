const express = require("express");
const router = express.Router();

const fs = require("fs");
const audioController = require("../controller/audioController");

router.get("/audios", audioController.getAll);

router.get("/audios/:id", audioController.getByID);

router.post("/audios", audioController.upload);

router.put("/audios/:id", audioController.modify);

router.delete("/audios/:id", audioController.delete);

module.exports = router;