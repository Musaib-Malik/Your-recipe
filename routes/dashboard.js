// Import npm modules
const express = require("express");
const router = express.Router();

// Import local modules
const Recipe = require("../db/models/Recipie");
const { ensureAuth, formatDate } = require("../utils/utilFunctions");

// @desc    Show dashboard
// @route   /dashboard
router.get("/", ensureAuth, async (req, res) => {
  // Get user recipes
  const userRecipies = await Recipe.find({ owner: req.user._id });

  res.render("dashboard", {
    recipes: userRecipies,
    name: req.user.username,
    formatDate,
  });
});

// Export router
module.exports = router;
