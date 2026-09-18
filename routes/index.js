const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) => {
    //#swagger.tags=["Home"]
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.use("/carreras", require("./carreras"));
router.use("/facultades", require("./facultades"));

module.exports = router;