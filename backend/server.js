//Zolboo Erdenebaatar
//12/7/2019
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); //configures so that we can have our environment
//variables in our dotenv files. In this case, this connects with our .env file in the
//same folder.

const app = express(); //create our express server. Express is a server framework for Node.js
const port = process.env.PORT || 3000;

app.use(cors()); // our "middleware".
app.use(express.json()); //allows us to parse json that our server receives and sends

const uri = process.env.ATLAS_URI; //uri is where our database is stored.
//this is where we connect with our database. Get it from our .env file in this
//same folder.
console.log("GOT URL: ", uri);


mongoose.connect(uri, {useNewUrlParse: true, useCreateIndex:true});
const connection = mongoose.connection; //save it in a different variable
connection.once('open', ()=> {
  console.log("MongoDB database has been connected") //log it if it's successful
});

const spacesRouter = require('./routes/spaces'); //basically import the spaces file.
const usersRouter = require('./routes/users');

app.use('/spaces',spacesRouter);//.use function so that the app can use it. Whenever
//a user goes to the website slash /spaces, it will load everything in the router
//that is specified. i.e. /routes/spaces.js
app.use('/users',usersRouter);

//nodemon allows us to start a server and it also has hot-reload
app.listen(port, ()=> {
  console.log('Server is running on port: '+port);
});

//in terminal, "nodemon server" to start our server once we're in the same directory
