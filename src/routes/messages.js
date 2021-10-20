const router = require('express').Router();
const val = require("../middlewares/validations.js");
const messagesController = require('../controllers/messages.controller.js');

router.post('/:channelId', messagesController.createMessage);
router.get('/:channelId', val.validateToken,messagesController.getMessagesByChannel);

module.exports = router;
