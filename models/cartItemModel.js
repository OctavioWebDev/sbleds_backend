const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  font: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: {
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      }
    },
    required: true
  },
  backingType: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CartItem', CartItemSchema);
