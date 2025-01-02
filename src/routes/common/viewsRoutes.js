const express = require('express');
const router = express.Router();

const user = {
    name: "John Doe",
    avatar: "https://via.placeholder.com/120",
};

// Example chat data
const chats = [
    {
        name: "John",
        avatar: "https://via.placeholder.com/50",
        lastMessage: "Hey, how are you?",
        time: "2:45 PM",
    },
    {
        name: "Jane",
        avatar: "https://via.placeholder.com/50",
        lastMessage: "Let's meet up later.",
        time: "1:20 PM",
    },
];


// Welcome Page
router.get('/', (req, res) => {
    // res.send("HELLO")
    const userData = {};
    res.render('welcome', { userData });
});


// Login
router.get('/login', (req, res) => {
    const messages = req.flash();
    const userData = messages.userData ? messages.userData[0] : {};

    return res.render('login', { messages, userData });
});

// Sign Up
router.get('/signUp', (req, res) => {
    const messages = req.flash();
    const userData = messages.userData ? messages.userData[0] : {};
    return res.render('signup', { messages, userData });
});

// Home Page
router.get('/home', (req, res) => {
    const userData = req.user || null;
    return res.render('home', { chats: chats});
});

router.get('/profile', (req, res) => {
    const userData = req.user || null;
    return res.render('profile', { user: user});
});

module.exports = router;
