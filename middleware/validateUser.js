// const { body, validationResult } = require('express-validator');

// module.exports = [
//   // Validate and sanitize username
//   body('username')
//     .trim() // Sanitize: trim whitespace
//     .notEmpty()
//     .withMessage('Username is required')
//     .isLength({ min: 3, max: 20 })
//     .withMessage('Username must be between 3 and 20 characters')
//     .matches(/^[a-zA-Z0-9]+$/)
//     .withMessage('Username can only contain letters and numbers'),

//   // Validate and normalize email
//   body('email')
//     .notEmpty()
//     .withMessage('Email is required')
//     .isEmail()
//     .withMessage('Invalid email format')
//     .normalizeEmail(),

//   // Validate and sanitize password
//   body('password')
//     .trim() // Consider whether trimming password is appropriate for your use case
//     .notEmpty()
//     .withMessage('Password is required')
//     .isLength({ min: 8 })
//     .withMessage('Password must be at least 8 characters long')
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
//     .withMessage(
//       'Password must contain at least one lowercase letter, one uppercase letter, and one number'
//     ),

//   // Check for validation errors
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   }
// ];
