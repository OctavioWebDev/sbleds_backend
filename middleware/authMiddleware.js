// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const blacklist = new Set(); // Add this at the top of authMiddleware.js

// const authMiddleware = async (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//       return res.status(401).json({ message: 'No authorization token provided' });
//     }

//     const token = req.headers.authorization.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Optional: Check against a token blacklist
//     if (blacklist.has(token)) {
//       return res.status(401).json({ message: 'Token has been revoked' });
//     }

//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       res.status(401).json({ message: 'Token expired' });
//     } else {
//       console.error(error);
//       res.status(401).json({ message: 'Unauthorized' });
//     }
//   }
// };

// const isAdmin = (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return res.status(403).json({ message: 'Forbidden - Requires admin role' });
//   }
//   next();
// };

// module.exports = {
//   authMiddleware,
//   isAdmin,
// };


