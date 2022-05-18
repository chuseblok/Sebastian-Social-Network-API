const { Schema, model } = require("mongoose");
const thoughtsSchema = require("./thoughts");

const usernameSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_lentgh: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
      validate: {
        validator: () => Promise.resolve(false),
        message: "Email validation failed",
      },
    },

    thoughts: [thoughtsSchema],

    friends: [usernameSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = username.model("User", usernameSchema);
const user = new User();

user.email = "test@test.co";
user.name = "test";
user.validate().catch((error) => {
  assert.ok(error);
  assert.equal(error.errors["name"].message, "Oops!");
  assert.equal(error.errors["email"].message, "Email validation failed");
});

const username = model("username", usernameSchema);

module.exports = username;
