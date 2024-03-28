const { body, validationResult } = require('express-validator');
const CartItem = require('../models/cartItemModel');

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

// Middleware to get a cart item and verify ownership
async function getCartItemAndVerifyOwnership(req, res, next) {
  let cartItem;
  try {
    cartItem = await CartItem.findById(req.params.id).populate('user');
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

  // Verify if the cart item belongs to the current user
  if (cartItem.user._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden - You do not have permission to access this cart item' });
  }

  res.cartItem = cartItem; // Attach the cart item to the response object for the next middleware
  next();
}

module.exports = {
  validateCartItem,
 getCartItemAndVerifyOwnership,
};

