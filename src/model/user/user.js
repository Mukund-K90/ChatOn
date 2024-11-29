const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: { type: String, unique: true },
    password: String,
});

// User Model
const User = mongoose.model('User', userSchema);

module.exports = User;