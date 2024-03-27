require('dotenv').config(); // Ensure this is at the top
const express = require('express');
const app = express();
const path = require('path'); // Add this to use the path module
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const cartItemRouter = require('./routes/cartItemRouter');
const orderRouter = require('./routes/OrderRouter');
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

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

// API Routes
app.use(verifyJWT);
app.use('/api/users', userRoutes);
app.use('/api/cartitems', cartItemRouter);
app.use('/api/orders', orderRouter);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

// Error handling middleware
app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


