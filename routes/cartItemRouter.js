const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItemModel');
const { body, validationResult } = require('express-validator');
const { validateCartItem, checkCartItemExists, checkCartItemUser, getCartItem } = require('../middleware/cartItemMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');

//POST /cart - Add a new item to the cart
router.post('/', authMiddleware, validateCartItem, async (req, res) => {
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
});

//GET /cart - Retrieve all items in the cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user.id });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//PUT /cart/:id - Update an item in the cart
router.put('/:id', authMiddleware, validateCartItem, checkCartItemExists, checkCartItemUser, getCartItem, async (req, res) => {
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

//DELETE /cart/:id - Delete an item from the cart
router.delete('/:id', authMiddleware, checkCartItemExists, getCartItem, async (req, res) => {
  console.log("Delete route reached for ID:", req.params.id);
  try {
    // Using findOneAndDelete instead
    const deletedCartItem = await CartItem.findOneAndDelete({ _id: req.params.id });
    if (!deletedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json({ message: 'Cart item deleted', item: deletedCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
