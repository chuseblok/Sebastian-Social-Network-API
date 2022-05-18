const { thoughts, username } = require("../models/thoughts");

module.exports = {
  getCourses(req, res) {
    Course.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    thoughts
      .findOne({ _id: req.params.ThoughtsId })
      .select("-__v")
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No course with that ID" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Course.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    thoughts
      .findOneAndDelete({ _id: req.params.ThoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with that ID" })
          : username.deleteMany({ _id: { $in: thoughts.username } })
      )
      .then(() => res.json({ message: "thoughts and username deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    thoughts
      .findOneAndUpdate(
        { _id: req.params.ThoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};
