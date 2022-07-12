const router = require("express").Router();


//Establishing all the routes
const userRoutes = require("./user-routes");
const commentRoutes = require("./comment-routes");
const postRoutes = require("./post-routes");

//Calling to use said routes, then exporting them.
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/posts", postRoutes);

module.exports = router;


