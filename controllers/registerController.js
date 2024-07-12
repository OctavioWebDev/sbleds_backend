// controllers/registerController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, email, password } = req.body; // Expecting username, email, and password
    if (!username || !email || !password) {
        console.error('Username, email, and password are required.');
        return res.status(400).json({ 'message': 'Username, email, and password are required.' });
    }

    // Check for duplicate emails or usernames in the db
    const duplicateEmail = await User.findOne({ email }).exec();
    const duplicateUsername = await User.findOne({ username }).exec();
    if (duplicateEmail || duplicateUsername) {
        console.error('Duplicate email or username found:', email, username);
        return res.sendStatus(409); // Conflict
    }

    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Create and store the new user
        const result = await User.create({
            username: username,
            email: email,
            password: hashedPwd
        });

        console.log('New user created:', result);

        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        console.error('Error during user registration:', err.message);
        res.status(500).json({ 'message': 'Internal server error' });
    }
};

module.exports = { handleNewUser };