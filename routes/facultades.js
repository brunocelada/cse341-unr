const express = require("express");
const router = express.Router();

const facultadesController = require("../controllers/facultades");

router.get("/", facultadesController.getAll);

router.get("/:id", facultadesController.getSingle);

router.post("/", facultadesController.createFacultad);

router.put("/:id", facultadesController.updateFacultad);

router.delete("/:id", facultadesController.deleteFacultad);

module.exports = router;