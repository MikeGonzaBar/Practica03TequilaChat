const router = require('express').Router();
const val = require("../middlewares/validations.js");
const messagesController = require('../controllers/messages.controller.js');

router.post('/:channelId', val.validateToken,val.isLoggedIn, messagesController.createMessage);
router.get('/:channelId', val.validateToken,val.isLoggedIn,messagesController.getMessagesByChannel);

module.exports = router;
