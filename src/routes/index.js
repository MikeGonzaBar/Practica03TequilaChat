const indexRouter = require('express').Router();

const userRoutes = require('./users');
const loginRoutes = require('./login');
const channelRoutes = require('./channels');

indexRouter.use('/users', userRoutes);
indexRouter.use('/logins', loginRoutes);
indexRouter.use('/channels', channelRoutes);

module.exports = indexRouter;