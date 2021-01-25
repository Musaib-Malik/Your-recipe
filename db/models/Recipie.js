// Import mongoose
const mongoose = require("mongoose");

// Define recipie schema
const RecipieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Create recipie model
const Recipie = mongoose.model("Recipie", RecipieSchema);

// Export model
module.exports = Recipie;
