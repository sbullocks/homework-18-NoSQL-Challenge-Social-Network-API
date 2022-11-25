const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).thought(createThought);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;
