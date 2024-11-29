const { default: status } = require('http-status');
const { errorResponse, successResponse } = require('../../../utils/apiResponse');
const { ERROR_MESSAGE } = require('../../../helper/error.message');
const { SUCCESS_MESSAGE } = require('../../../helper/success.message');
const userDao = require('../../../dao/v1/user/userDao');
const bcrypt = require('bcrypt');


//sign up
exports.userSignUp = async (req, res) => {
    try {
        const userData = req.body;

        if (userData.password !== userData.confirmPassword) {
            req.flash('error', ERROR_MESSAGE.CONFIRM_PASSWORD_MATCH);
            req.flash('userData', userData); // Pass user data for pre-filling fields
            return res.redirect('/signUp');
        }

        const existingUser = await userDao.getUserByMobile(userData.mobile);
        if (existingUser) {
            req.flash('error', ERROR_MESSAGE.USER_EXIST);
            req.flash('userData', userData);
            return res.redirect('/signUp');
        }

        userData.password = await bcrypt.hash(userData.password, 10);
        const addedUser = await userDao.addUser(userData);
        if (!addedUser) {
            req.flash('error', ERROR_MESSAGE.USER_NOT_CREATED);
            req.flash('userData', userData);
            return res.redirect('/signUp');
        }

        req.flash('success', SUCCESS_MESSAGE.USER_CREATED);
        return res.redirect('/login');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/signUp');
    }
};

//login
exports.userLogin = async (req, res) => {
    try {
        const userData = req.body;

        const existingUser = await userDao.getUserByMobile(userData.mobile);
        if (!existingUser) {
            req.flash('error', ERROR_MESSAGE.USER_NOT_FOUND);
            req.flash('userData', userData);
            return res.redirect('/');
        }

        const isMatch = await bcrypt.compare(userData.password, existingUser.password);
        if (!isMatch) {
            req.flash('error', ERROR_MESSAGE.WRONG_PASSWORD);
            req.flash('userData', userData);
            return res.redirect('/');
        }
        req.flash('success', SUCCESS_MESSAGE.USER_CREATED);
        return res.send('DONE');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/');
    }
};