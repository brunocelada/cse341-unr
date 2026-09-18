const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "UNR API",
        description: "A RESTful API for managing degree programs information using Node.js, Express, and MongoDB. (BYU | CSE341)",
    },
    host: "cse341-unr.onrender.com",
    schemes: ["https"],
    // To test:
    //      host: "localhost:3000",
    //      schemes: ["http", "https"],
    // To Render:
    //      host: "cse341-unr.onrender.com",
    //      schemes: ["https"],
    contact: {
        name: "Bruno Celada",
        url: "https://github.com/brunocelada"
    }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);