const express = require('express');
const connectDB = require('./server');
const userRoutes = require('./routes/userRoutes');
const cartItemRouter = require('./routes/cartItemRouter');

// Connect to MongoDB database
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cart-items', cartItemRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
