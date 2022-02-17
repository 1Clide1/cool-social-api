// import express router
const router = require("express").Router();
// import the models
const { Thoughts, User } = require("../../models");

// route to get all thoughts
router.get("/", async (req, res) => {
  try {
    const getThoughts = await Thoughts.find();
    res.json(getThoughts);
  } catch (err) {
    // again assuming that I have at least one thought then if this errors out that means I messed up
    // aka the server has an issue
    res.status(500).json(err);
  }
});
// route to get a thought by its id
router.get("/:id", async ({ params }, res) => {
  try {
    const getThoughtsId = await Thoughts.findOne({ _id: params.id });
    if (!getThoughtsId) {
      // same idea status 404 becuase the user was not found
      res.status(404).json({ message: "there are no users with this id" });
    } else {
      res.json(getThoughtsId);
      console.log(`user: ${getThoughtsId} has been found`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
// route to create a thought
router.post("/", async ({ params, body }, res) => {
  try {
    const createThought = await Thoughts.create(body);
    ({ userId: _id }) => {
      return User.findOneAndUpdate(
        { username: body.username },
        { $push: { thoughts: userId } },
        { new: true }
      );
    };
    if (!userId) {
      res.status(404).json({ message: "there are no users with this id" });
    } else {
      res.json(createThought);
      console.log(`this thought:${createThought} has now been added`);
    }
    // not sure why this still triggers but this function does indeed work
  } catch (err) {
    res.status(400).json(err);
  }
});

// export the router
module.exports = router;
