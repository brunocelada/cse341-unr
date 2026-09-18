const express = require("express");
const router = express.Router();
const path = require("path");

const carrerasController = require("../controllers/carreras");

router.get("/display/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/carreras.html"));
});

router.get("/", carrerasController.getAll);

router.get("/:id", carrerasController.getSingle);

router.post("/", carrerasController.createCarrera);

router.put("/:id", carrerasController.updateCarrera);

router.delete("/:id", carrerasController.deleteCarrera);

module.exports = router;