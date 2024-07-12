const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found.' });
    res.json(users);
}

const createNewUser = async (req, res) => {
    if (!req?.body?.username || !req?.body?.email || !req?.body?.password) {
        return res.status(400).json({ 'message': 'Username, email, and password are required' });
    }

    try {
        const result = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateUser = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
    }
    if (req.body?.username) user.username = req.body.username;
    if (req.body?.email) user.email = req.body.email;
    if (req.body?.password) user.password = req.body.password;
    const result = await user.save();
    res.json(result);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID required.' });

    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
    }
    const result = await user.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required.' });

    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.params.id}.` });
    }
    res.json(user);
}

// Add this function
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username }).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser,
    getUserProfile 
}