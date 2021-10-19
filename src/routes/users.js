const router = require('express').Router();
const usersController = require('../controllers/users.controller.js');

router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserById);
router.post('/', usersController.createUser);

module.exports = router;
