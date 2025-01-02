const Chat = require("../../../model/chat");

// Create a new chat
module.exports.createChat = async (users) => {
    try {
        const chat = new Chat({ users: users });
        return await chat.save();
    } catch (error) {
        throw new Error(error);
    }
}