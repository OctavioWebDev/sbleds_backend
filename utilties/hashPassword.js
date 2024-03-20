const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const hashPassword = async (password) => {
  try {
    // Retrieve salt rounds from environment variable or use 10 as a default
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password.');
  }
};

module.exports = hashPassword;

