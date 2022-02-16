// import the dependencies
const express = require("express");
const mongoose = require("mongoose");
// set express up as app and set the port
const app = express();
// env for port as more of a future proof idea if I wanted to add this into heroku or use env
const PORT = process.env.PORT || 3001;
// import the routes from controller
const routes = require("./controller");
// require the connection file since I put it in a seperate folder
require("./config/connection");
// express middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make sure to be on mongoose 5.3 to use these settings
// setting the mongoose middlewares
mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);
// using the express routes in the server
app.use(routes);
// this lets us run the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
