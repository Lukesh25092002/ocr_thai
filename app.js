/*
This is the main app.js
This is starting point of the server
*/


const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use("/public",express.static("./Public"));
app.set('views',path.join(__dirname,"./Views"));


// Connecting to mongoDB database
mongoose.connect(process.env.DATABASE_LINK)
.then(function () {
    console.log("Database connected");
})
.catch(function (err) {
    console.log(err);
});



// All the necessary routers created in Router folder are imported and connected to the main app
const secretRouter = require("./Router/secretRouter.js");
app.use("/secret",secretRouter);

const userRouter = require("./Router/userRouter.js");
app.use("/user",userRouter);

const cardRouter = require("./Router/cardRouter.js");
app.use("/card",cardRouter);

const filterRouter = require("./Router/filterRouter.js");
app.use("/filter",filterRouter);


// Server starts listning
app.listen(process.env.PORT,process.env.HOSTNAME,function(){
    console.log(`The server has started on port ${process.env.PORT}`);
});