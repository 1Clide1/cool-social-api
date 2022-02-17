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
router.post("/", async ({ body }, res) => {
  try {
    //   I was trying to not use then and to only use try and catch but using then in this case just
    // made what I was trying to do more effective
    const createThought = await Thoughts.create(body).then(({ _id }) => {
      return User.findOneAndUpdate(
        { username: body.username },
        { $push: { thoughts: _id } },
        { new: true }
      );
    });
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
// route to update a thought by its specific id
router.put("/:id", async ({ params, body }, res) => {
  try {
    const updateThoughts = await Thoughts.findOneAndUpdate(
      { _id: params.id },
      body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateThoughts) {
      res
        .status(404)
        .json({ message: "there are no thoughts that are found with this id" });
    } else {
      res.json(updateThoughts);
      console.log(`user: ${updateThoughts} has been updated`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
// route to delet a thought
router.delete("/:id", async ({ params }, res) => {
  try {
    const deleteThought = await Thoughts.findOneAndDelete({ _id: params.id });
    if (!deleteThought) {
      res
        .status(404)
        .json({ message: "there are no users that are found with this id" });
    } else {
      res.json(deleteThought);
      console.log(`user: ${deleteThought} has been deleted`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
// export the router
module.exports = router;
