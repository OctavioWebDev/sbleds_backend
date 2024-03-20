const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assuming you have a Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  // Add other relevant fields here, such as size, color, etc., based on your CartItem model
});

const OrderSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

  items: [
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CartItem' 
    }
],

  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'shipped', 'cancelled'],
    default: 'pending',
  },

  total: {
    type: Number,
    required: true,
  },

  shippingAddress: {
    type: String,
    required: true,
  },

  // Include any other fields relevant to an order, such as payment details, shipping method, etc.
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
