const mongoose = require('mongoose');
const { CONFIG } = require('./config');

module.exports.connectDb = () => {
    try {
        mongoose.connect(CONFIG.dbUrl);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database error", error);
    }
}
