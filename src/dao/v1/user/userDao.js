const Token = require('../../../model/authToken');
const User = require('../../../model/user');


//get user by email
module.exports.getUserByMobile = async (mobile) => {
    try {
        return await User.findOne({ mobile: mobile });
    } catch (error) {
        throw error;
    }
}

//get user by id
module.exports.getUserById = async (id) => {
    try {
        return await User.findById(id);
    }
    catch (error) {
        throw error;
    }
}

//add user
module.exports.addUser = async (userData) => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
}


//generate new Token
module.exports.generateToken = async (id, token) => {
    const storedToken = new Token({
        userId: id,
        token: token,
    });
    storedToken.save();
    return storedToken;
}

//update Token
module.exports.updateToken = async (id, token) => {
    const updateToken = await Token.findOneAndUpdate({ userId: id }, { token }, { new: true });
    updateToken.save();
    return updateToken;
}