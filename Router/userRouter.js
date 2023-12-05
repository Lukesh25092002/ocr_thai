/*
This is user Router
It handles the user acctions like displaying webpages to user
It contains only the usage functions declared in controller folder and forwards them to corrspinding url
It simply forwards the url request to function that provide response
*/

const express = require("express");
const userRouter = express.Router();

const {displayHomeWindow,displayCardWindow} = require("../Controller/userController.js");


userRouter.route("/home")
.get(displayHomeWindow);

userRouter.route("/card/:identification_number")
.get(displayCardWindow);


module.exports = userRouter;