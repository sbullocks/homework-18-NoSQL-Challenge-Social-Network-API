const { Thought, Users } = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
    .populate({ path: 'reactions', select: '-__v' })
      .then((Thoughts) => res.json(Thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Thought
  getSingleThought(req, res) {
    console.log(req.params);
    Thought.findOne({ _id: req.params.thoughtId })
    .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => {
      return Users.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: Thought._id } },
        { new: true }
      );
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // createThought(req, res) {
  //   Thought.create(req.body)
  //     .then((Thought) => res.json(Thought))
  //     return Users.findOneAndUpdate(
  //       { _id: req.body.userId },
  //       { $addToSet: { thoughts: Thought._id } },
  //       { new: true }
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     });
  // },

  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : Thought.deleteMany({ _id: { $in: Thought.thoughts } })
      )
      .then(() => res.json({ message: 'Thought and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add an Reaction to a Thought
  addReaction(req, res) {
    console.log('You are adding an Reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { Reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove Reaction from a Thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { Reaction: { ReactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
