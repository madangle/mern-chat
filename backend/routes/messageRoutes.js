const express = require('express');
const router = express.Router();

const {
  createMessage,
  getMessages
} = require('../controllers/messageController');

router.route('/').post(createMessage);
router.route('/:chatId').get(getMessages)
module.exports = router;