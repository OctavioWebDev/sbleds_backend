const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../../controllers/orderController');
const { checkOrderOwnership } = require('../../middleware/OrderMiddleware');

router.post('/', [body('items').notEmpty(), body('shippingAddress').notEmpty()], createOrder);
router.get('/', getAllOrders);
router.get('/:id', [checkOrderOwnership], getOrderById);
router.put('/:id', [checkOrderOwnership, body('status').notEmpty()], updateOrder);
router.delete('/:id', [checkOrderOwnership], deleteOrder);

module.exports = router;

