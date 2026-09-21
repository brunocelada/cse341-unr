const express = require("express");
const router = express.Router();

const passport = require("../config/passport");

// Login con GitHub
router.get(
    "/github",
    passport.authenticate("github", {
        scope: ["user:email"],
    })
);

// Callback de GitHub
router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/",
    }),
    (req, res) => {
        res.redirect("/");
    }
);

// Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.redirect("/");
        });
    });
});

// Estado de autenticación
router.get("/status", (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({
            authenticated: true,
            user: {
                id: req.user.id,
                username: req.user.username,
                displayName: req.user.displayName,
            },
        });
    }

    res.json({
        authenticated: false,
    });
});

module.exports = router;