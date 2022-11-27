const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,

} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;
