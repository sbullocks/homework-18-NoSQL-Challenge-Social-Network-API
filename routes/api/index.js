const router = require('express').Router();
const thoughtsRoutes = require('./thoughts-routes');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughts-routes);
router.use('/users', user-routes);

module.exports = router;
