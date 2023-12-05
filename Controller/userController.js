const cardModel = require("../Model/cardModel.js");

/*
This is user Controller
It contains the implementation of functions user in user Router
*/

async function displayHomeWindow(req,res) {
    res.status(202).render("home.ejs",{});
}

async function displayCardWindow(req,res){
    const identification_number = req.params.identification_number;
    cardModel.findOne({'identification_number': identification_number})
    .then(function(cardRecord){
        const payload = {
            outcome: "success",
            description: "The card record is returned along with the response in cardRecord feild",
            cardRecord : cardRecord
        };

        res.status(202).render("card.ejs",payload);
    })
    .catch(function(err){
        res.status(500).json({
            outcome: "failure",
            description: "The fetching of the cardRecord failed",
            error: err
        });
    });
}

module.exports = {
    displayHomeWindow,
    displayCardWindow
};