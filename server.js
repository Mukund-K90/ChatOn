const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const { connectDb } = require('./src/config/db');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// MongoDB Connection
connectDb();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

//set cookie-session for flash
app.use(cookieParser('NotSoSecret'));
app.use(session({
    secret: 'something',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Routes
app.get('/login', (req, res) => {
    const messages = req.flash();
    const userData = messages.userData ? messages.userData[0] : {};

    return res.render('pages/login', { messages, userData }); 
});


app.get('/signUp', (req, res) => {
    const messages = req.flash();
    const userData = messages.userData ? messages.userData[0] : {};

    return res.render('pages/signup', { messages, userData }); 
});

//define user route
const userRoute = require('./src/routes/user/userRoutes');
app.use('/v1/user', userRoute);


// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
