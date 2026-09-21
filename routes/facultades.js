const express = require("express");
const router = express.Router();
const path = require("path");

const facultadesController = require("../controllers/facultades");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/display/", (req, res) => {
    //#swagger.tags=["Facultades"]
    //#swagger.ignore = true
    res.sendFile(path.join(__dirname, "../views/facultades.html"));
});

router.get("/",
    //#swagger.tags=["Facultades"]
    //#swagger.summary = "Get all universities"
    //#swagger.description = "Retrieves all universities stored in the database."
    facultadesController.getAll);

router.get("/:id",
    //#swagger.tags=["Facultades"]
    //#swagger.summary = "Get an university by ID" 
    //#swagger.description = "Retrieves a single university using its MongoDB ID."
    facultadesController.getSingle);

router.post("/",
    //#swagger.tags=["Facultades"]
    //#swagger.summary = "Create a new university"
    //#swagger.description = "Creates a new university in the database."
    isAuthenticated,
    validation.saveUniversity,
    facultadesController.createFacultad);

router.put("/:id",
    //#swagger.tags=["Facultades"]
    //#swagger.summary = "Update a university"
    //#swagger.description = "Updates an existing university using its MongoDB ID."
    isAuthenticated,
    validation.saveUniversity,
    facultadesController.updateFacultad);

router.delete("/:id",
    //#swagger.tags=["Facultades"]
    //#swagger.summary = "Delete a university"
    //#swagger.description = "Deletes a university using its MongoDB ID."
    isAuthenticated,
    facultadesController.deleteFacultad);

module.exports = router;