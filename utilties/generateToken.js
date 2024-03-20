const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (userId) => {
  try {
    const payload = { userId };
    const options = { expiresIn: '24h' };
    const secret = process.env.JWT_SECRET;
    
    const token = jwt.sign(payload, secret, options);
    
    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Failed to generate token.');
  }
};

module.exports = generateToken;

