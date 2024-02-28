const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (userId) => {
  const payload = {
    userId,
  };

  const options = {
    expiresIn: '1h',
  };

  const secret = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secret, options);

  return token;
};

module.exports = generateToken;
