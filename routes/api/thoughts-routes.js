const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).thought(createThought);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;
