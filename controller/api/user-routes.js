// import express router
const router = require("express").Router();
// import models
const { User, Thoughts } = require("../../models");

// route to get all users
router.get("/", async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (err) {
    res.json(err);
  }
});
// route to post a new user
router.post("/", async ({ body }, res) => {
  try {
    const createUser = await User.create(body);
    res.json(createUser);
  } catch (err) {
    res.json(err);
  }
});
// route to delete a user
router.delete("/:id", async ({params}, res)=>{
    try{
        const deleteUser = await User.findOneAndDelete({ _id: params.id });]\
        if (!deleteUser){
            res.json({ message: "there are no users that are found with this id" });
        } else{
            res.json(deleteUser);
            console.log(`user ${deleteUser} has been deleted`);
        }
    }
    catch(err){
        res.json(err);
    }
});
// export the router
module.exports = router;
