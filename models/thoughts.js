const { schema, Types } = require("mongoose");
const reactionSchema = require("./reaction");

const thoughtsSchema = new schema(
  {
    thoughtsId: {
      type: schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    ThoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
      thoughts: [thoughtsSchema],
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
module.exports = thoughtsSchema;
