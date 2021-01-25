// Import mongoose
const mongoose = require("mongoose");

// Define user schema
const InactiveUserSchema = new mongoose.Schema({
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
  createdAt: { type: Date, expires: "10m", default: Date.now },
});

// Create user model
const InactiveUser = mongoose.model("InactiveUser", InactiveUserSchema);

// Export model
module.exports = InactiveUser;
