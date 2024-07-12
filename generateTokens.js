const crypto = require('crypto');

const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const accessTokenSecret = generateSecret();
const refreshTokenSecret = generateSecret();

console.log('ACCESS_TOKEN_SECRET:', accessTokenSecret);
console.log('REFRESH_TOKEN_SECRET:', refreshTokenSecret);
