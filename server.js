const express = require("express");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const mongodb = require("./data/database.js");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const app = express();

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

var options = {
    customCss: ".swagger-ui .topbar {display: none}"
};

// ------------
// PASSPORT - GITHUB
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// ------------
// MIDDLEWARE
app
    .use(bodyParser.json())
    // Session
    .use(session({
        secret: process.env.SESSION_SECRET || "cookie",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors({ methods: ["GET", "POST", "DELETE", "PUT", "PATCH"] }))
    .use(cors({ origin: "*" }))
    .use((req, res, next) => {
        res.setHeader(
            "Access-Control-Allow-Origin",
            "*"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
        );
        res.setHeader("Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
        next();
    })
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

// ------------
// GITHUB CALLBACK
app.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/api-docs",
        session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);


// ------------
// ROUTES
app.use("/", require("./routes"));

// ------------
// ERROR HANDLING
process.on("uncaughtException", (err, origin) => {
    console.log(process.stderr.fd,
        `Caught exception: ${err}\n` +
        `Exception origin: ${origin}`
    );
});


// ------------
// DATABASE + SERVER
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT, () => {
            console.log("Database is listening and node Running on port " + PORT)
        });
    }
});

app.listen(PORT, () => {
    console.log("Running on port " + PORT);
});