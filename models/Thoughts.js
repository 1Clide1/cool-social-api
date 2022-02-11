// creating the thoughts model
const { Schema, model } = require("mongoose");
const ThoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    minlength: 1,
    maxlength: 280,
    required: [true, "Must be at least 1 or 280 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  },
  username: {
    type: String,
    required: [true, "A username is required"],
  },
  reactions: [reactionSchema],
});
// making the nested reaction schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Schema.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    maxlength: 280,
    required: [true, "Must be only 280(max) or less characters."],
  },
  username: {
    type: String,
    required: [true, "A username is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  },
});
// making a virtual for the reaction count
ThoughtsSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});
// export the model
const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;
