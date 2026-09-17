const router = require("express").Router();

router.get("/", (req, res) => {
    //#swagger.tags=["Home"]
    res.send("Carreras y Facultades");
});

router.use("/carreras", require("./carreras"));
router.use("/facultades", require("./facultades"));

module.exports = router;