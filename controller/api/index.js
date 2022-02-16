// import router
const router = require("express").Router();

// get the api routes
const userRoutes = require("./user-routes");
const thoughtsRoutes = require("./thoughts-routes");

// these are where the routes are going to go
router.use("/user", userRoutes);
router.use("/thoughts", thoughtsRoutes);

// export the router that way I can use the routes
module.exports = router;
