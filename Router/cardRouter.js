/*
This is card Router
It handles the CRUD operations on card in database
It contains only the usage functions declared in controller folder and forwards them to corrspinding url
It simply forwards the url request to function that provide response
*/

const express = require("express");
const cardRouter = express.Router();

const {createCard,getCard,updateCard,deleteCard} = require("../Controller/cardController.js");


cardRouter.route("/")
.put(createCard);

cardRouter.route("/:identification_number")
.get(getCard)
.post(updateCard)
.delete(deleteCard);


module.exports = cardRouter;