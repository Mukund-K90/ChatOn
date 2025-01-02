const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const { connectDb } = require('./src/config/db');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { CONFIG } = require('./src/config/config');

app.use(cors())
// MongoDB Connection
connectDb();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views/pages'));

// Set cookie-session for flash
app.use(cookieParser('NotSoSecret'));
app.use(session({
    secret: 'something',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Define common routes
const viewsRoutes = require('./src/routes/common/viewsRoutes');
app.use('/', viewsRoutes);

// Define user route
const userRoute = require('./src/routes/user/userRoutes');
app.use('/v1/user', userRoute);

//Define Chat Route
const chatRoute = require('./src/routes/chat/chatRoutes');
app.use('/v1/chat', chatRoute);

// Start server
const PORT = CONFIG.port || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
