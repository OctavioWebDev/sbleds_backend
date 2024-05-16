require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/VerifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const usersRoutes = require('./routes/api/users');
const cartItemRouter = require('./routes/api/cartItemRouter');
const orderRouter = require('./routes/api/OrderRouter');
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// General request logger - logs all incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// Note: verifyJWT middleware is now applied only to specific routes that require authentication
// Unauthenticated routes like /register, /auth, /refresh, and /logout do not use verifyJWT
app.use('/api/users', usersRoutes);
app.use('/api/cartitems', verifyJWT, cartItemRouter);
app.use('/api/orders', verifyJWT, orderRouter);

// Catchall handler for 404 errors, now logging the request that led to the 404
app.all('*', (req, res) => {
    console.log(`404 Not Found: ${req.method} ${req.url}`);
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// Enhanced error handling middleware, logging the error and the request
app.use((error, req, res, next) => {
    console.error(`Error during request ${req.method} ${req.url}:`, error);
    res.status(500).json({ message: 'Internal server error' });
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});



