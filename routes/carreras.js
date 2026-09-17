const express = require("express");
const router = express.Router();

const carrerasController = require("../controllers/carreras");

router.get("/", carrerasController.getAll);

router.get("/:id", carrerasController.getSingle);

router.post("/", carrerasController.createCarrera);

router.put("/:id", carrerasController.updateCarrera);

router.delete("/:id", carrerasController.deleteCarrera);

module.exports = router;