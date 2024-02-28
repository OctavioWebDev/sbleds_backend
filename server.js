const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
//const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartItemRouter');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartItemRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
