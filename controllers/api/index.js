const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const produceRoutes = require('./produce-routes');
const trackedProduceRoutes = require('./tracked-produce-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/produce', produceRoutes);
router.use('/tracked-produce', trackedProduceRoutes);

module.exports = router;