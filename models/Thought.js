const { Schema, model } = require('mongoose');
const date = require('../utils/date')

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createAtval => dateFormat(createAtval)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        getters: true
    }
}
);

// Create a virtual property `reactionCount` that gets the amount of comments per user
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our thought model

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
