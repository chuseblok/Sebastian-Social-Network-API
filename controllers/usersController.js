const { ObjectId } = require("mongoose").Types;
const { username, reaction } = require("../models/username");

const headCount = async () =>
  username
    .aggregate()
    .count("username")
    .then((numberOfUsers) => numberOfUsers);

const reaction = async (usernameId) =>
  username.aggregate([
    // only include the given student by using $match
    { $match: { _id: ObjectId(usernameId) } },
    {
      $unwind: "$reaction",
    },
    {
      $group: {
        _id: ObjectId(studentId),
        friendReaction: { $react: "$reaction.friends" },
      },
    },
  ]);

module.exports = {
  getUsername(req, res) {
    username
      .find()
      .then(async (username) => {
        const usernameObj = {
          username,
          headCount: await headCount(),
        };
        return res.json(usernameObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleUsername(req, res) {
    username
      .findOne({ _id: req.params.usernameId })
      .select("-__v")
      .then(async (username) =>
        !username
          ? res.status(404).json({ message: "No users with that ID" })
          : res.json({
              username,
              reaction: await reaction(req.params.usernameId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUsername(req, res) {
    username
      .create(req.body)
      .then((username) => res.json(username))
      .catch((err) => res.status(500).json(err));
  },

  deleteUsername(req, res) {
    username
      .findOneAndRemove({ _id: req.params.username.id })
      .then((username) =>
        !username
          ? res.status(404).json({ message: "No such user exists" })
          : Course.findOneAndUpdate(
              { username: req.params.usernameId },
              { $pull: { username: req.params.usernameId } },
              { new: true }
            )
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({
              message: "User deleted, but no thoughts found",
            })
          : res.json({ message: "User successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addReaction(req, res) {
    console.log("You are adding an reaction");
    console.log(req.body);
    username
      .findOneAndUpdate(
        { _id: req.params.usernameId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      )
      .then((username) =>
        !username
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(username)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    username
      .findOneAndUpdate(
        { _id: req.params.usernameId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
      .then((username) =>
        !username
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(username)
      )
      .catch((err) => res.status(500).json(err));
  },
};
