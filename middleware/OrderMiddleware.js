const Order = require('../models/OrderModel');
const checkOrderOwnership = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Assuming the Order model has a user field that stores the user's ID
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized for this order' });
    }

    req.order = order; // Pass the order along to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {checkOrderOwnership}
