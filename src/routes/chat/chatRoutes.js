const express = require('express');
const { createChat } = require('../../controller/v1/chatManagementController/chatManagement');
const { authentication } = require('../../middleware/auth.middleware');
const router = express.Router();

router.post('/createChat', authentication, createChat);

module.exports = router;