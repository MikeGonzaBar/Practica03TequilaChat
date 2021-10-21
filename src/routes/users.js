const router = require('express').Router();
const usersController = require('../controllers/users.controller.js');

/**
 * @swagger
 * paths:
 *   /api/users:
 *     get:
 *       description: Get all the registered users
 *       tags:
 *         - users
 *       responses:
 *         200:
 *           description: success response
 *         400:
 *           description: bad data request
 *         500:
 *           description: error from server
 */
router.get('/', usersController.getAllUsers);

/**
 * @swagger
 * paths:
 *   /api/users/{userId}:
 *     get:
 *       description: Get an user by his id
 *       tags:
 *         - users
 *       parameters:
 *         - in: path
 *           name: userId
 *           description: The id of the user wanted
 *           schema: The id of the user wanted
 *       responses:
 *         200:
 *           description: success response
 *         400:
 *           description: bad data request
 *         500:
 *           description: error from server
 */
router.get('/:userId', usersController.getUserById);

/**
 * @swagger
 * paths:
 *   /api/users/:
 *     post:
 *       description: Register a new user using email and password
 *       tags:
 *         - users
 *       parameters:
 *         - in: body
 *           name: user
 *           description: The user to be registered
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string 
 *       responses:
 *         200:
 *           description: success response
 *         400:
 *           description: bad data request
 *         500:
 *           description: error from server
 */
router.post('/', usersController.createUser);

module.exports = router;
