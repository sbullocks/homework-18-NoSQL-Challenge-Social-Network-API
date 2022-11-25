const router = require('express').Router();
const thoughtsRoutes = require('./thoughts-routes');
const userRoutes = require('./users-routes');

router.use('/thoughts', thoughts-routes);
router.use('/users', users-routes);

module.exports = router;
