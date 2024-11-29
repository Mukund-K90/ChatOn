const express = require('express');
const { userSignUp, userLogin } = require('../../controller/v1/user/userController');
const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', userLogin);

module.exports = router;