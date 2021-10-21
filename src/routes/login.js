const router = require('express').Router();
const loginController = require('../controllers/login.controller.js');

/**
 * @swagger
 * paths:
 *   /api/logins:
 *     get:
 *       description: Get all the logs
 *       tags:
 *         - login
 *       responses:
 *         200:
 *           description: success response
 *         400:
 *           description: bad data request
 *         500:
 *           description: error from server
 */
router.get('/', loginController.getAllLogin);

/**
 * @swagger
 * paths:
 *   /api/logins/:
 *     post:
 *       description: Log in into a registered account
 *       tags:
 *         - login
 *       parameters:
 *         - in: body
 *           name: user
 *           description: The user to be logged in
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
router.post('/', loginController.createLogin);

module.exports = router;
