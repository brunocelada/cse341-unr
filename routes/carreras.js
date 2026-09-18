const express = require("express");
const router = express.Router();
const path = require("path");

const carrerasController = require("../controllers/carreras");
const validation = require("../middleware/validate");

router.get("/display/", (req, res) => {
    //#swagger.tags=["Carreras"]
    //#swagger.ignore = true
    res.sendFile(path.join(__dirname, "../views/carreras.html"));
});

router.get("/", carrerasController.getAll);

router.get("/:id", carrerasController.getSingle);

router.post("/", validation.saveDegree, carrerasController.createCarrera);

router.put("/:id", validation.saveDegree, carrerasController.updateCarrera);

router.delete("/:id", carrerasController.deleteCarrera);

module.exports = router;