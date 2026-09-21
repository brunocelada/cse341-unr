const router = require("express").Router();
const passport = require("passport");
const path = require("path");

router.get("/", (req, res) => {
    //#swagger.tags=["Home"]
    //#swagger.ignore = true
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/login", passport.authenticate("github"), (req, res) => { });

router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

router.use("/carreras", require("./carreras"));
router.use("/facultades", require("./facultades"));

module.exports = router;