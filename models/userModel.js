const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: '' // Assuming this would be a URL to the image
  },
  previousOrders: [{
    orderId: String, // Simplified for example; consider referencing an Order model
    status: String,
    // Add other order details as needed
  }],
  currentOrders: [{
    orderId: String, // Simplified for example; consider referencing an Order model
    status: String,
    // Add other order details as needed
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);

