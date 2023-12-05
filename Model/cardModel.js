/*
This is Model
It contains the schema declaration for database cluster
It defines a model named cardModel concerning to the syntax and asemntics of ddata to be entered in database
*/

const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    'identification_number': {
        type: String,
        required: true,
    },
    'name': {
        type: String,
        required: true,
    },
    'last_name': {
        type: String,
        required: true,
    },
    'date-of-birth': {
        type: String,
        required: true,
    },
    'date-of-issue': {
        type: String,
        required: true,
    },
    'date-of-expiry': {
        type: String,
        required: true,
    }
});

const cardModel = mongoose.model("cardModel",cardSchema);

module.exports = cardModel;

// {
//     "identification_number": "4 7363 39613 02 7",
//     "name": "Mr. Rotngern",
//     "last_name": "Yoopm",
//     "date-of-birth": "31/03/2006",
//     "date-of-issue": "15/09/2020",
//     "date-of-expiry": "05/02/2026"
// }