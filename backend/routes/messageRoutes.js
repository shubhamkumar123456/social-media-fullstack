const express = require('express');
const checkToken = require('../middleware/checkToken');
const { sendMessage, getMessage } = require('../controllers/messageController');
const router = express.Router();

router.post('/send/:friendId',checkToken,sendMessage)
router.get('/getMessage/:friendId',checkToken,getMessage)



module.exports = router