const cardModel = require("../Model/cardModel.js");
const {formatDate_universal_2_YYYYMMDD} = require("../Helper/dateSupport.js");

/*
This is filter Controller
It contains the implementation of functions used in filter Router
*/

async function noFilter(req,res) {
    cardModel.find()
    .then(function(results){
        res.status(200).json({
            outcome: "success",
            messsage: "The query is filtered",
            description: "The results are sent along with in the results feild of the response",
            result: results
        });
    })
    .catch(function(err){
        res.status(500).json({
            outcome: "failure",
            message: "Coundnt't fetch records from card model",
            description: "There was an error in filtering card records from card model",
            error: err,
        });
    });
}

async function singleKeyfilter(req,res) {
    const key = req.params.key;
    const value = req.params.value;

    const query = {};
    query[key] = value;

    cardModel.find(query)
    .then(function(results){
        res.status(200).json({
            outcome: "success",
            messsage: "The query is filtered",
            description: "The results are sent along with in the results feild of the response",
            result: results
        });
    })
    .catch(function(err){
        res.status(500).json({
            outcome: "failure",
            message: "Coundnt't fetch records from card model",
            description: "There was an error in filtering card records from card model",
            error: err,
        });
    });
}

module.exports = {
    noFilter,
    singleKeyfilter
}