const router = require('express').Router();
const val = require("../middlewares/validations.js");
const channelController = require('../controllers/channels.controller.js');

/**
 * @swagger
 * paths:
 *   /api/channels:
 *     get:
 *       description: Get all the channels created by the users
 *       tags:
 *         - channels
 *       responses:
 *         200:
 *           description: success response
 *         400:
 *           description: bad data request
 *         500:
 *           description: error from server
 */
router.get('/', channelController.getAllChannels);

/**
 * @swagger
 * paths:
 *   /api/channels/:
 *     post:
 *       description: Create a new channel where the user is the owner
 *       tags:
 *         - channels
 *       parameters:
 *         - in: header
 *           name: x-auth
 *           schema:
 *             type: string
 *         - in: body
 *           name: channel
 *           description: The channel to be created
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string 
 *       responses:
 *         200:
 *           description: success response
 *         400:
 *           description: bad data request
 *         500:
 *           description: error from server
 */
router.post('/', val.validateToken,channelController.createChannel);

/**
 * @swagger
 * paths:
 *   /api/channels/invite/{inviteUrl}:
 *     get:
 *       description: Join the linked channel
 *       tags:
 *         - channels
 *       parameters:
 *         - in: header
 *           name: x-auth
 *           schema:
 *             type: string
 *         - in: path
 *           name: inviteUrl
 *           description: The id of the invitation
 *           schema: The id of the invitation
 *       responses:
 *         200:
 *           description: success response
 *         400:
 *           description: bad data request
 *         500:
 *           description: error from server
 */
router.get('/invite/:inviteUrl', val.validateToken,val.isLoggedIn,channelController.joinChannel);

module.exports = router;
