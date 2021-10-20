const router = require('express').Router();
const val = require("../middlewares/validations.js");
const channelController = require('../controllers/channels.controller.js');

router.get('/', channelController.getAllChannels);
router.post('/', val.validateToken,channelController.createChannel);

module.exports = router;
