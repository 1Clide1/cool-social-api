// import express router
const router = require("express").Router();
// import models
const { User } = require("../../models");

// route to get all users
router.get("/", async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (err) {
    res.json(err);
  }
});
// route to get a user by it's id and it's populated thought and friend data
router.get("/:id", async ({ params }, res) => {
  try {
    const getUserId = await User.findOne({ _id: params.id })
      .populate({
        // make sure the path in the user model matches the thoughts array
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        // same idea for the friends array in the user model
        path: "friends",
        select: "-__v",
      });
    if (!getUserId) {
      // using 404 because that means that the server could not find what you are looking for or it does not exist in the server
      res.status(404).json({ message: "there are no users with this id" });
    } else {
      res.json(getUserId);
      console.log(`user: ${getUserId} has been found`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
// route to post a new user
router.post("/", async ({ body }, res) => {
  try {
    const createUser = await User.create(body);
    res.json(createUser);
  } catch (err) {
    //if there is an error I added that the status will be 400 since that is considered to be a bad request
    res.status(400).json(err);
  }
});
// route to update a user by its id
// using params for the id and body to actually target the changes to the specific user
router.put("/:id", async ({ params, body }, res) => {
  // using findOneAndUpdate doesn't go through any required or validators
  // instead of using findOne then create and then save you can just say in the (using this {}) that new:true and that run validators are true
  //new: true returns the doc after it was updated and the run vaildator set to true lets the function use the required, match or any validator you are using in your schema
  try {
    const updateUser = await User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    });
    if (!updateUser) {
      res
        .status(404)
        .json({ message: "there are no users that are found with this id" });
    } else {
      res.json(updateUser);
      console.log(`user: ${updateUser} has been updated`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
// route to delete a user
router.delete("/:id", async ({ params }, res) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: params.id });
    if (!deleteUser) {
      res
        .status(404)
        .json({ message: "there are no users that are found with this id" });
    } else {
      res.json(deleteUser);
      console.log(`user: ${deleteUser} has been deleted`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
// export the router
module.exports = router;
