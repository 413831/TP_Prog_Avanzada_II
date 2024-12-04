const express = require("express");
const router = express.Router();
const controller = require('../controller/userController');

router.get("/users", controller.getAll);
router.get("/users/:id", controller.getByID);
router.post("/users", controller.create);
router.put("/users/:id", controller.modify);
router.delete("/users/:id", controller.delete);

module.exports = router;