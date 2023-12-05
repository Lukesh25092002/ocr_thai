/*
This is filter Router
It handles the filtering based requests based on various criteria
It contains only the usage functions declared in controller folder and forwards them to corrspinding url
It simply forwards the url request to function that provide response
*/

const express = require("express");
const {noFilter,singleKeyfilter} = require("../Controller/filterController.js");
const filterRouter = express.Router();

filterRouter.route("/")
.get(noFilter);

filterRouter.route("/:key/:value")
.get(singleKeyfilter);

module.exports = filterRouter;