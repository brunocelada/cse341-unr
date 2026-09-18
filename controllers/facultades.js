const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getSingle = async (req, res) => {
    //#swagger.tags=["Facultades"]
    //#swagger.summary = "Get a university by ID" 
    //#swagger.description = "Retrieves a single university using its MongoDB ID."
    const facultadId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("facultades").find({ _id: facultadId });
    result.toArray().then((facultades) => {
        if (facultades.length === 0) {
            return res.status(404).json({ message: "ID not found" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(facultades[0]);
    });
};

const getAll = async (req, res) => {
    //#swagger.tags=["Facultades"]
    //#swagger.summary = "Get all universities"
    //#swagger.description = "Retrieves all universities stored in the database."
    const result = await mongodb.getDatabase().db().collection("facultades").find();
    result.toArray().then((facultades) => {
        if (facultades.length === 0) {
            return res.status(404).json({ message: "Database is empty" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(facultades);
    });
};

const createFacultad = async (req, res) => {
    //#swagger.tags=["Facultades"]
    //#swagger.summary = "Create a new university"
    //#swagger.description = "Creates a new university in the database."
    const {
        name,
        location,
        web,
        social,
        phone,
        logo,
        carreras
    } = req.body;
    const facultad = {
        name,
        location,
        web,
        social,
        phone,
        logo,
        carreras
    };
    if (!name || !location || !web || !social || !phone || !logo || !carreras) {
        return res.status(400).json({ message: "All fields are required." });
    };
    const response = await mongodb.getDatabase().db().collection("facultades").insertOne(facultad);
    if (response.acknowledged) {
        res.status(201).json({ id: response.insertedId });
    } else {
        res.status(500).json(response.error || "Some error ocurred while creating the university.");
    }
};

const updateFacultad = async (req, res) => {
    //#swagger.tags=["Facultades"]
    //#swagger.summary = "Update a university"
    //#swagger.description = "Updates an existing university using its MongoDB ID."
    const facultadId = new ObjectId(req.params.id);
    const {
        name,
        location,
        web,
        social,
        phone,
        logo,
        carreras
    } = req.body;
    const facultad = {
        name,
        location,
        web,
        social,
        phone,
        logo,
        carreras
    };
    if (!name || !location || !web || !social || !phone || !logo || !carreras) {
        return res.status(400).json({ message: "All fields are required." });
    };
    const response = await mongodb.getDatabase().db().collection("facultades").replaceOne({ _id: facultadId }, facultad);
    if (response.matchedCount === 0) {
        return res.status(404).json({ message: "ID not found" });
    }
    if (response.modifiedCount > 0) {
        res.status(200).json({ message: "University updated" });
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating the university.");
    }
};

const deleteFacultad = async (req, res) => {
    //#swagger.tags=["Facultades"]
    //#swagger.summary = "Delete a university"
    //#swagger.description = "Deletes a university using its MongoDB ID."
    const facultadId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("facultades").deleteOne({ _id: facultadId });
    if (response.deletedCount === 0) {
        return res.status(404).json({ message: "ID not found" });
    } else if (response.deletedCount > 0) {
        res.status(200).json({ message: "University removed" });
    } else {
        res.status(500).json(response.error || "Some error ocurred while deleting the university.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createFacultad,
    updateFacultad,
    deleteFacultad
}