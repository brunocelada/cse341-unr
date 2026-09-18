const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json("You must use a valid degree id.");
        }
        const degreeId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("carreras")
            .find({ _id: degreeId });
        result.toArray().then((degrees) => {
            if (degrees.length === 0) {
                return res.status(404).json({ message: "ID not found" });
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(degrees[0]);
        });
    } catch (error) {
        console.error("Error getting a degree:", error);
        res.status(500).json({
            message: "Error getting a degree",
            error: error.message
        });
    }
};

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("carreras")
            .find();
        result.toArray().then((degrees) => {
            if (degrees.length === 0) {
                return res.status(404).json({ message: "Database is empty" });
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(degrees);
        });
    } catch (error) {
        console.error("Error getting carreras:", error);
        res.status(500).json({
            message: "Error getting carreras",
            error: error.message
        });
    }

};

const createCarrera = async (req, res) => {
    try {
        const {
            carrera,
            facultadId,
            phone,
            durationYears,
            mail,
            creditHours,
            type
        } = req.body;
        const degree = {
            carrera,
            facultadId,
            phone,
            durationYears,
            mail,
            creditHours,
            type
        };
        if (!carrera || !facultadId || !phone || !durationYears || !mail || !creditHours || !type) {
            return res.status(400).json({ message: "All fields are required." });
        };
        const response = await mongodb.getDatabase().db().collection("carreras").insertOne(degree);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json(response.error || "Some error ocurred while creating the degree.");
        }
    } catch (error) {
        console.error("Error creating a degree:", error);
        res.status(500).json({
            message: "Error creating a degree",
            error: error.message
        });
    };
};

const updateCarrera = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json("You must use a valid degree id to update it.");
        }
        const degreeId = new ObjectId(req.params.id);
        const {
            carrera,
            facultadId,
            phone,
            durationYears,
            mail,
            creditHours,
            type
        } = req.body;
        const degree = {
            carrera,
            facultadId,
            phone,
            durationYears,
            mail,
            creditHours,
            type
        };
        if (!carrera || !facultadId || !phone || !durationYears || !mail || !creditHours || !type) {
            return res.status(400).json({ message: "All fields are required." });
        };
        const response = await mongodb.getDatabase().db().collection("carreras").replaceOne({ _id: degreeId }, degree);
        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "ID not found" });
        }
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Degree updated" });
        } else {
            res.status(500).json(response.error || "Some error ocurred while updating the degree.");
        };
    } catch (error) {
        console.error("Error updating a degree:", error);
        res.status(500).json({
            message: "Error updating a degree",
            error: error.message
        });
    };
};

const deleteCarrera = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json("You must use a valid degree id to delete it.");
        }
        const degreeId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection("carreras").deleteOne({ _id: degreeId });
        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "ID not found" });
        } else if (response.deletedCount > 0) {
            res.status(200).json({ message: "Degree removed" });
        } else {
            res.status(500).json(response.error || "Some error ocurred while deleting the degree.");
        };
    } catch (error) {
        console.error("Error deleting a degree:", error);
        res.status(500).json({
            message: "Error deleting a degree",
            error: error.message
        });
    };
};

module.exports = {
    getAll,
    getSingle,
    createCarrera,
    updateCarrera,
    deleteCarrera
};