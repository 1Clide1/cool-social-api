// need to make sure to require mongoose again since it is in a seperate file
const mongoose = require("mongoose");

// creating the config for mongoose
module.exports = mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/socialdb",
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
