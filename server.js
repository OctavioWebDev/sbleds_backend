require('dotenv').config(); // Ensure this is at the top
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path'); // Add this to use the path module
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const cartItemRouter = require('./routes/cartItemRouter');
const errorHandler = require('./middleware/errorHandler');
const orderRouter = require('./routes/OrderRouter');
const app = express();

// Connect to database
connectDB();

// Middleware for security and logging
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/cartitems', cartItemRouter);
app.use('/api/orders', orderRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


