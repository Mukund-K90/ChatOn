const express = require('express');
const { userSignUp, userLogin, userLogOut } = require('../../controller/v1/user/userController');
const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', userLogin);
router.post('/logout', userLogOut);

module.exports = router;