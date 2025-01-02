const mongoose = require("mongoose");

// Define Chat Schema
const chatSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

chatSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.users = ret.users.map(userId => userId.toString());  
        return ret;
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
