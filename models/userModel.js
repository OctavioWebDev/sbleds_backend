const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: '' // Assuming this would be a URL to the image
  },
  previousOrders: [{
    orderId: String, // Simplified for example; consider referencing an Order model
    status: String,
    // Add other order details as needed
  }],
  currentOrders: [{
    orderId: String, // Simplified for example; consider referencing an Order model
    status: String,
    // Add other order details as needed
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Hash the password before saving the user to the database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

// Compare the entered password with the stored hash
UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      if (!isMatch) return reject(false);
      resolve(true);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);

