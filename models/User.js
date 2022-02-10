// creating the user model
const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
    required: "username must be at least 3 characters long.",
  },
  email: {
    type: String,
    unique: true,
    match: [/.{1,}@[^.]{1,}/, "must be an email"],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thoughts",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = model("User", UserSchema);

module.exports = User;
