const { default: status } = require('http-status');
const chatDao = require('../../../dao/v1/chatManagementDao/chatManagementDao');
const { getUserById, getUserByMobile } = require('../../../dao/v1/user/userDao');
const { errorResponse, successResponse } = require('../../../utils/apiResponse');
const { ERROR_MESSAGE } = require('../../../helper/error.message');
const { SUCCESS_MESSAGE } = require('../../../helper/success.message');

exports.createChat = async (req, res) => {
    try {
        const { mobile } = req.body;
        const user = await getUserByMobile(mobile);
        if (!user) {
            return errorResponse(req, res, status.NOT_FOUND, ERROR_MESSAGE.USER_NOT_FOUND);
        }
        const chat = await chatDao.createChat([req.user._id, user._id]);
        if (!chat) {
            return errorResponse(req, res, status.BAD_REQUEST, ERROR_MESSAGE.FAILED_TO_CREATE_CHAT_ROOM);
        }
        return successResponse(req, res, status.OK, SUCCESS_MESSAGE.CHAT_ROOM_CREATED, { chatId: chat.id });
    } catch (error) {
        return errorResponse(req, res, status.INTERNAL_SERVER_ERROR, error.message, error);
    }
}