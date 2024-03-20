require('dotenv').config(); // Ensure this is at the top
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const cartItemRouter = require('./routes/cartItemRouter');
const errorHandler = require('./middleware/errorHandler'); // Assuming you have this middleware
const orderRouter = require('./routes/OrderRouter'); // Require order routes
const app = express();

// Connect to database
connectDB();

// Middleware for security and logging
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cartitems', cartItemRouter);
app.use('/api/orders', orderRouter);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

