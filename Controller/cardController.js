const cardModel = require("../Model/cardModel.js");

/*
This is card Controller
It contains the implementation of functions used in card Router
*/


/*
This is a PUT request function
*/
async function createCard(req,res) {
    const cardData = req.body;
    const newCardRecord = new cardModel(cardData);

    newCardRecord.save()
    .then(function(){
        res.status(202).json({
            outcome: "success",
            description: "The log was saved successfully"
        });
    })
    .catch(function(err){
        res.status(500).json({
            outcome: "fail",
            description: "There was an error in saving the card record in cardModel",
            error: err
        });
    });
}


async function getCard(req,res) {
    const identification_number = req.params.identification_number;
    cardModel.findOne({'identification_number': identification_number})
    then(function(){
        res.status(202).json({
            outcome: "success",
            description: "The card record is returned along with the response",
            card : cardRecord
        });
    })
    .catch(function(err){
        res.status(500).json({
            outcome: "success",
            description: "The card record is returned along with the response",
            error: err
        });
    });
    
}


function updateCard(req,res) {
    const identification_number = req.params.identification_number;
    const filter = {'identification_number': identification_number};
    const updations = req.body;
    
    cardModel.updateOne(filter,{$set:updations})
    .then(function(result){
        res.status(202).json({
            outsome: "success",
            message: "The request was successful and metadata is sent alogn with in result feild",
            description: "This is from updateOne function from cardModel",
            result: result
        });
    })
    .catch(function(err){
        res.status(500).json({
            outcome: "failure",
            massage: "Error in updating",
            description: "This occured form updateOne function of mongoose on cardModel",
            error: err
        });
    });
}


async function deleteCard(req,res) {
    const identification_number = req.params.identification_number;
    cardModel.deleteOne({'identification_number': identification_number})
    .then(function(){
        res.status(202).json({
            outcome: 'success',
            description: 'The card has been deleted'
        });
    })
    .catch(function(err){
        res.status(500).json({
            outcome: 'failure',
            description: 'There was some error in deleting the card',
            error: err
        });
    });
}


module.exports = {
    createCard,
    getCard,
    updateCard,
    deleteCard
};