const { default: status } = require('http-status');
const { errorResponse, successResponse } = require('../../../utils/apiResponse');
const { ERROR_MESSAGE } = require('../../../helper/error.message');
const { SUCCESS_MESSAGE } = require('../../../helper/success.message');
const userDao = require('../../../dao/v1/user/userDao');
const bcrypt = require('bcrypt');
const Token = require('../../../model/authToken');
const { createUserSession } = require('../../../utils/jwt');

// Sign Up
exports.userSignUp = async (req, res) => {
    try {
        const userData = req.body;

        if (userData.password !== userData.confirmPassword) {
            req.flash('error', ERROR_MESSAGE.CONFIRM_PASSWORD_MATCH);
            req.flash('userData', userData); // Pre-fill fields
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
        req.flash('userData', null);
        return res.redirect('/login');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/signUp');
    }
};

// Login
exports.userLogin = async (req, res) => {
    try {
        const userData = req.body;

        const existingUser = await userDao.getUserByMobile(userData.mobile);
        if (!existingUser) {
            req.flash('error', ERROR_MESSAGE.USER_NOT_FOUND);
            req.flash('userData', userData);
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(userData.password, existingUser.password);
        if (!isMatch) {
            req.flash('error', ERROR_MESSAGE.WRONG_PASSWORD);
            req.flash('userData', userData);
            return res.redirect('/login');
        }
        const sessionResponse = createUserSession(existingUser);
        const token = (await sessionResponse).sessionToken;
        const checkToken = await Token.findOne({ userId: existingUser._id });
        if (!checkToken) {
            const savedToken = await userDao.generateToken(existingUser._id, token);
            if (!savedToken) {
                return errorResponse(req, res, status.BAD_REQUEST,);
            }
        }
        const updateToken = await userDao.updateToken(existingUser._id, token);
        if (!updateToken) {
            return errorResponse(req, res, status.BAD_REQUEST, ERROR_MESSAGE.TOKEN_SAVE_FAILED);
        }
        req.flash('success', SUCCESS_MESSAGE.USER_LOGGED_IN);
        return res.redirect('/home');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/login');
    }
};


// Logout
exports.userLogOut = async (req, res) => {
    try {
        req.flash('userData', null);
        return res.redirect('/login');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/login');
    }
};


