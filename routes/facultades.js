const express = require("express");
const router = express.Router();
const path = require("path");

const facultadesController = require("../controllers/facultades");
const validation = require("../middleware/validate");

router.get("/display/", (req, res) => {
    //#swagger.tags=["Facultades"]
    //#swagger.ignore = true
    res.sendFile(path.join(__dirname, "../views/facultades.html"));
});

router.get("/", facultadesController.getAll);

router.get("/:id", facultadesController.getSingle);

router.post("/", validation.saveUniversity, facultadesController.createFacultad);

router.put("/:id", validation.saveUniversity, facultadesController.updateFacultad);

router.delete("/:id", facultadesController.deleteFacultad);

module.exports = router;