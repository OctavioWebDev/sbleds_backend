const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItemModel');
const { body, validationResult } = require('express-validator');
const { getCartItem } = require('../middleware/cartItemMiddleware');
const auth = require('../middleware/authMiddleware');

// POST /cart - Add a new item to the cart
router.post(
  '/cart',
  auth,
  [
    body('text').notEmpty().withMessage('Text is required'),
    body('font').notEmpty().withMessage('Font is required'),
    body('color').notEmpty().withMessage('Color is required'),
    body('size.width').isInt({ gt: 0 }).withMessage('Width must be a positive integer'),
    body('size.height').isInt({ gt: 0 }).withMessage('Height must be a positive integer'),
    body('backingType').notEmpty().withMessage('Backing type is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { text, font, color, size, backingType, location, quantity } = req.body;
      const cartItem = new CartItem({ text, font, color, size, backingType, location, quantity, user: req.user.id });
      await cartItem.save();
      res.status(201).json(cartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// GET /cart - Retrieve all items in the cart
router.get('/cart', auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user.id });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /cart/:id - Update an item in the cart
router.put('/cart/:id', auth, getCartItem, async (req, res) => {
  try {
    const { text, font, color, size, backingType, location, quantity } = req.body;
    const updatedCartItem = await CartItem.findByIdAndUpdate(
      res.cartItem._id,
      { text, font, color, size, backingType, location, quantity },
      { new: true }
    );
    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /cart/:id - Delete an item from the cart
router.delete('/cart/:id', auth, getCartItem, async (req, res) => {
  try {
    const deletedCartItem = await CartItem.findByIdAndRemove(res.cartItem._id);
    res.status(200).json({ message: 'Cart item deleted', item: deletedCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
