/*
This is secret Router
It handles the secret information like api_key and other server details for client to use
It contains only the usage functions declared in controller folder and forwards them to corrspinding url
It simply forwards the url request to function that provide response
*/

const express = require("express");
const {google_vision_api_key} = require("../Controller/secretController.js");
const secretRouter = express.Router();

secretRouter.route("/google_vision_api_key")
.get(google_vision_api_key);

module.exports = secretRouter;