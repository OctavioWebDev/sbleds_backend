const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const cartItemRouter = require('./routes/cartItemRouter');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cart', cartItemRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
