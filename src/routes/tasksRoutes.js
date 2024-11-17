const express = require("express");
const router = express.Router();
const controller = require('../controller/taskController');

router.get("/tasks", controller.getAll);
router.get("/tasks/:id", controller.getByID);
router.post("/tasks", controller.create);
router.put("/tasks/:id", controller.modify);
router.delete("/tasks/:id", controller.delete);

module.exports = router;