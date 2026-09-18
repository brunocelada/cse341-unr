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

router.get("/",
    //#swagger.tags=["Carreras"]
    //#swagger.summary = "Get all degrees"
    //#swagger.description = "Retrieves all degrees stored in the database."
    carrerasController.getAll);

router.get("/:id",
    //#swagger.tags=["Carreras"]
    //#swagger.summary = "Get a degree by ID" 
    //#swagger.description = "Retrieves a single degree using its MongoDB ID."
    carrerasController.getSingle);

router.post("/",
    //#swagger.tags=["Carreras"]
    //#swagger.summary = "Create a new degree"
    //#swagger.description = "Creates a new degree in the database."
    validation.saveDegree, carrerasController.createCarrera);


router.put("/:id",
    //#swagger.tags=["Carreras"]
    //#swagger.summary = "Update a degree"
    //#swagger.description = "Updates an existing degree using its MongoDB ID."
    validation.saveDegree, carrerasController.updateCarrera);

router.delete("/:id",
    //#swagger.tags=["Carreras"]
    //#swagger.summary = "Delete a degree"
    //#swagger.description = "Deletes a degree using its MongoDB ID."
    carrerasController.deleteCarrera);

module.exports = router;