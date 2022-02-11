const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

const { Thoughts, User } = require("./models");
// require the connection file since I put it in a seperate folder
require("./config/connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make sure to be on 5.3 to use these settings
mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
