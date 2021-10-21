const router = require('express').Router();
const val = require("../middlewares/validations.js");
const messagesController = require('../controllers/messages.controller.js');

/**
 * @swagger
 * paths:
 *   /api/messages/{channelId}:
 *     post:
 *       description: Send a new message to the channel
 *       tags:
 *         - messages
 *       parameters:
 *         - in: header
 *           name: x-auth
 *           schema:
 *             type: string
 *         - in: path
 *           name: channelId
 *           description: The id of the channel
 *           schema: The id of the channel
 *         - in: body
 *           name: message
 *           description: The message to be sent
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string 
 *       responses:
 *         200:
 *           description: success response
 *         400:
 *           description: bad data request
 *         500:
 *           description: error from server
 */
router.post('/:channelId', val.validateToken,val.isLoggedIn, messagesController.createMessage);

/**
 * @swagger
 * paths:
 *   /api/messages/{channelId}:
 *     get:
 *       description: Get all the messages from a channel
 *       tags:
 *         - messages
 *       parameters:
 *         - in: header
 *           name: x-auth
 *           schema:
 *             type: string
 *         - in: path
 *           name: channelId
 *           description: The id of the channel
 *           schema: The id of the channel
 *       responses:
 *         200:
 *           description: success response
 *         400:
 *           description: bad data request
 *         500:
 *           description: error from server
 */
router.get('/:channelId', val.validateToken,val.isLoggedIn,messagesController.getMessagesByChannel);

module.exports = router;
