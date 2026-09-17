const express = require("express");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const mongodb = require("./data/database.js");
const app = express();

const PORT = process.env.PORT || 3000;

var options = {
    customCss: ".swagger-ui .topbar {display: none}"
};

app.use((req, res, next) => {
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
});
app
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
    .use(bodyParser.json())
    .use("/", require("./routes"));


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