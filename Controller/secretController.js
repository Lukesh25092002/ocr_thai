/*
This is secret Controller
It contains the implementation of functions used in secret Router
*/

async function google_vision_api_key(req,res){
    const google_vision_api_key = JSON.parse(process.env.GOOGLE_VISION_API_KEY);
    res.status(200).json({
        outcome: "success",
        message: "The request was successful",
        description: "The result is sent in the resut feild",
        result: google_vision_api_key
    });
}

module.exports = {
    google_vision_api_key
};