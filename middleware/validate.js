const validator = require("../helpers/validate");

const saveDegree = (req, res, next) => {
    const validationRule = {
        carrera: "required|string",
        facultadId: "required|string",
        phone: "required|string",
        durationYears: "required|numeric|max:25",
        mail: "required|email",
        creditHours: "required|integer",
        type: "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

const saveUniversity = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        location: "required|string",
        web: "required|url",
        social: "url",
        phone: "required|string",
        logo: "string",
        carreras: "required"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveDegree,
    saveUniversity,
};