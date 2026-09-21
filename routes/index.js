const router = require("express").Router();
const passport = require("passport");
const path = require("path");


// Home page
router.get("/", (req, res) => {
    //#swagger.tags=["Home"]
    //#swagger.ignore = true
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Login
router.get("/auth/login",
    //#swagger.tags=["login"]
    //#swagger.ignore = true
    passport.authenticate("github"),
    (req, res) => { }
);

// Auth Status
router.get("/auth/status", (req, res) => {
    //#swagger.tags=["Auth Status"]
    //#swagger.ignore = true
    //#swagger.summary = "Check the session status"
    //#swagger.description = "Get the authorization status for the actual session."
    if (req.session.user) {
        return res.json({
            authenticated: true,
            user: req.session.user
        });
    }
    res.json({
        authenticated: false
    });
});

// Logout
router.get("/auth/logout", (req, res, next) => {
    //#swagger.tags=["logout"]
    //#swagger.ignore = true
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error: ", err);
            return next(err);
        }
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
});

// API Routes
router.use("/carreras", require("./carreras"));
router.use("/facultades", require("./facultades"));

module.exports = router;