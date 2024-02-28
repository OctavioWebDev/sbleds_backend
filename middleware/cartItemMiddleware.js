const { body, validationResult } = require('express-validator');
const CartItemModel = require('../models/CartItemModel');


// Validate the request body for creating or updating a cart item
const validateCartItem = [
  body('text').notEmpty().withMessage('Text is required'),
  body('font').notEmpty().withMessage('Font is required'),
  body('color').notEmpty().withMessage('Color is required'),
  body('size.width').isNumeric().withMessage('Width must be a number'),
  body('size.height').isNumeric().withMessage('Height must be a number'),
  body('backingType').notEmpty().withMessage('Backing type is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
];

// Check if the cart item exists in the database
const checkCartItemExists = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.cartItem = cartItem;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Check if the cart item belongs to the current user
const checkCartItemUser = (req, res, next) => {
  if (res.cartItem.user.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

// Middleware to get a cart item by ID
async function getCartItem(req, res, next) {
  let cartItem;

  try {
    cartItem = await CartItem.findById(req.params.id);

    if (cartItem == null) {
      return res.status(404).json({ message: 'Cannot find cart item' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.cartItem = cartItem;
  next();
}

module.exports = {
  validateCartItem,
  checkCartItemExists,
  checkCartItemUser,
  getCartItem,
};

