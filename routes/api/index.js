const router = require("express").Router();
const thoughtRoutes = require("./thoughtsRoughts");
const userRoutes = require("./usersRoutes");

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;
