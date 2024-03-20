const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel'); // Adjust the path as necessary
const { authMiddleware } = require('../middleware/authMiddleware'); // Adjust the path as necessary
const { checkOrderOwnership } = require('../middleware/OrderMiddleware'); // Adjust the path as necessary
const { body, validationResult } = require('express-validator');

// POST /api/orders - Create a new order
router.post('/', [authMiddleware, body('items').notEmpty(), body('shippingAddress').notEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { items, shippingAddress, total } = req.body;
    const order = new Order({
      user: req.user._id, // Assuming your authMiddleware sets `req.user`
      items,
      total,
      shippingAddress,
      status: 'pending', // Default status
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders - Get all orders for the current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders/:id - Get a single order by ID
router.get('/:id', [authMiddleware, checkOrderOwnership], async (req, res) => {
  res.status(200).json(req.order); // `req.order` is set by `checkOrderOwnership` middleware
});

// PUT /api/orders/:id - Update an order's status
// Note: This is a basic example. Adjust validations and logic as needed for your application.
router.put('/:id', [authMiddleware, checkOrderOwnership, body('status').notEmpty()], async (req, res) => {
  try {
    const { status } = req.body;
    req.order.status = status;
    await req.order.save();
    res.status(200).json(req.order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/orders/:id - Delete an order
router.delete('/:id', [authMiddleware, checkOrderOwnership], async (req, res) => {
  try {
    await req.order.remove();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
