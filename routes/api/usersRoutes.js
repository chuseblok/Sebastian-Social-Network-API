const router = require("express").Router();
const {
  getUsername,
  getSingleUsername,
  createUsername,
  deleteUsername,
  addReaction,
  removeReaction,
} = require("../../controllers/usersController");

router.route("/").get(getUsername).post(createUsername);

router.route("/:usernameId:").get(getSingleUsername).delete(deleteUsername);

router.route("/:usernameId/reactions").post(addReaction);

router.route("/::usernameId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
