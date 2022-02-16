// import router
const router = require("express").Router();

// import the api routes
const apiRoutes = require("./api");
// say where the api routes are coming from
router.use("/api", apiRoutes);
// if you are not on any route you should get a 404
router.use((req, res) => {
  res.status(404).end();
});
// export the router that way I can use this for the sever
module.exports = router;
