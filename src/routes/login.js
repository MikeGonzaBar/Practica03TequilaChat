const router = require('express').Router();
const loginController = require('../controllers/login.controller.js');

router.get('/', loginController.getAllLogin);
router.post('/', loginController.createLogin);

module.exports = router;
