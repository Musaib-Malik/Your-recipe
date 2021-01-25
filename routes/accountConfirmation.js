// Import NPM modules
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Import local modules
const User = require("../db/models/User");
const InactiveUser = require("../db/models/Inactive");
const { ensureGuest } = require("../utils/utilFunctions");

// @desc    Activate user account
// @route   GET /confirmation/:token
router.get("/:token", ensureGuest, async (req, res) => {
  // Activate user
  try {
    const userID = await jwt.verify(req.params.token, process.env.JWT_SECRET)
      .user;

    // Get inactive user
    const user = await InactiveUser.findById(userID);

    // Save to active users collection
    const activatedUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
      active: true,
    });

    // Save to main users and delete the old inactive one
    await activatedUser.save();
    await InactiveUser.findByIdAndDelete(userID);

    // Redirect to login
    req.flash("success_msg", "You are now registered and can log in");
    res.redirect("/login");
  } catch (err) {
    res.render("expired", { err });
  }
});

// Export router
module.exports = router;
