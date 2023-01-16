const express = require("express"); //Importing the Express.js framework for creating server-side applications
const bodyParser = require("body-parser"); //Importing the body-parser middleware for parsing incoming request bodies
const route = require("../src/route/route"); //Importing a file for handling routing.
const mongoose = require("mongoose"); //Importing the Mongoose library for interacting with a MongoDB database
const app = express(); //Creating an Express application instance

app.use(bodyParser.json()); //Using the body-parser middleware to parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); //Using the body-parser middleware to parse URL-encoded request bodies

//Connecting to a MongoDB database using the provided connection string
mongoose
  .connect(
    "mongodb+srv://bidyut10:kabir34268@cluster0.rw6eu.mongodb.net/WinBackend_Management?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route); //Using the imported routing file for handling routes starting with "/"

//Starting the Express application to listen on a port specified by the process.env.PORT environment variable or port 3000 if it's not specified
app.listen(process.env.PORT || 3001, function () {
  console.log("Express app is running");
});
