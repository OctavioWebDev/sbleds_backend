const CartItem = require('../models/cartItemModel');

const createCartItem = async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const cartItem = new CartItem(req.body);
    cartItem.user = req.user._id;
    const result = await cartItem.save();
    res.status(201).json(result);
};

const getCartItems = async (req, res) => {
    const cartItems = await CartItem.find({ user: req.user._id }).exec();
    res.status(200).json(cartItems);
};

const updateCartItem = async (req, res) => {
    const { text, font, color, size, backingType, location, quantity } = req.body;
    Object.assign(res.cartItem, { text, font, color, size, backingType, location, quantity });
    const result = await res.cartItem.save();
    res.status(200).json(result);
};

const deleteCartItem = async (req, res) => {
    const result = await res.cartItem.remove();
    res.status(200).json(result);
};

module.exports = {
    createCartItem,
    getCartItems,
    updateCartItem,
    deleteCartItem
};

