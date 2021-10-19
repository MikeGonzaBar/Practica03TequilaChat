const indexRouter = require('express').Router();

const userRoutes = require('./users');
const loginRoutes = require('./login');

indexRouter.use('/users', userRoutes);
indexRouter.use('/logins', loginRoutes);

module.exports = indexRouter;