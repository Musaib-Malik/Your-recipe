// Import npm modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (req, res, next) {
  // This user
  const user = this;

  // Hash
  if (user.isModified()) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  // Carry on ...
  next();
});

// Create user model
const User = mongoose.model("User", UserSchema);

// Export model
module.exports = User;
