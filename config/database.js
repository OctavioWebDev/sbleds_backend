const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB with just the URI as recent versions of Mongoose handle the rest
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Graceful shutdown
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;



