const indexRouter = require('express').Router();

const userRoutes = require('./users');
const loginRoutes = require('./login');
const channelRoutes = require('./channels');
const messageRoutes = require('./messages');

indexRouter.use('/users', userRoutes);
indexRouter.use('/logins', loginRoutes);
indexRouter.use('/channels', channelRoutes);
indexRouter.use('/messages', messageRoutes);

module.exports = indexRouter;