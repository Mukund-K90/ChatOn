const User = require('../../../model/user/user');


//get user by email
module.exports.getUserByMobile = async (mobile) => {
    try {
        return await User.findOne({ mobile: mobile });
    } catch (error) {
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