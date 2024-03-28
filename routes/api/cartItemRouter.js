const express = require('express');
const router = express.Router();
const { createCartItem, getCartItems, updateCartItem, deleteCartItem } = require('../../controllers/cartitemController'); // Adjust the path as necessary
const { validateCartItem, getCartItemAndVerifyOwnership } = require('../../middleware/cartItemMiddleware');

// POST /cart - Add a new item to the cart
// GET /cart - Retrieve all items in the cart
router.route('/',) 
      .post(validateCartItem, createCartItem)
      .get(getCartItems);

// PUT /cart/:id - Update an item in the cart
//DELETE /cart/:id - Delete an item from the cart
router.route('/:id')
      .put(validateCartItem, getCartItemAndVerifyOwnership, updateCartItem)
      .delete( getCartItemAndVerifyOwnership, deleteCartItem);

module.exports = router;

