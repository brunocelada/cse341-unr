const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getSingle = async (req, res) => {
    //#swagger.tags=["Contacts"]
    //#swagger.summary = "Get a contact by ID" 
    //#swagger.description = "Retrieves a single contact using its MongoDB ID."
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("contacts").find({ _id: contactId });
    result.toArray().then((contacts) => {
        if (contacts.length === 0) {
            return res.status(404).json({ message: "ID not found" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
};

const getAll = async (req, res) => {
    //#swagger.tags=["Contacts"]
    //#swagger.summary = "Get all contacts"
    //#swagger.description = "Retrieves all contacts stored in the database."
    const result = await mongodb.getDatabase().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        if (contacts.length === 0) {
            return res.status(404).json({ message: "Database is empty" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

const createCarrera = async (req, res) => {
    //#swagger.tags=["Contacts"]
    //#swagger.summary = "Create a new contact"
    //#swagger.description = "Creates a new contact in the database."
    const {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    } = req.body;
    const contact = {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    };
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: "All fields are required." });
    };
    const response = await mongodb.getDatabase().db().collection("contacts").insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json({ id: response.insertedId });
    } else {
        res.status(500).json(response.error || "Some error ocurred while creating the user.");
    }
};

const updateCarrera = async (req, res) => {
    //#swagger.tags=["Contacts"]
    //#swagger.summary = "Update a contact"
    //#swagger.description = "Updates an existing contact using its MongoDB ID."
    const contactId = new ObjectId(req.params.id);
    const {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    } = req.body;
    const contact = {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    };
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: "All fields are required." });
    };
    const response = await mongodb.getDatabase().db().collection("contacts").replaceOne({ _id: contactId }, contact);
    if (response.matchedCount === 0) {
        return res.status(404).json({ message: "ID not found" });
    }
    if (response.modifiedCount > 0) {
        res.status(200).json({ message: "Contact updated" });
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating the user.");
    }
};

const deleteCarrera = async (req, res) => {
    //#swagger.tags=["Contacts"]
    //#swagger.summary = "Delete a contact"
    //#swagger.description = "Deletes a contact using its MongoDB ID."
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("contacts").deleteOne({ _id: contactId });
    if (response.deletedCount === 0) {
        return res.status(404).json({ message: "ID not found" });
    } else if (response.deletedCount > 0) {
        res.status(200).json({ message: "Contact removed" });
    } else {
        res.status(500).json(response.error || "Some error ocurred while deleting the user.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createCarrera,
    updateCarrera,
    deleteCarrera
}