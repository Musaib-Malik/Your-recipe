// Import npm modules
const express = require("express");
const router = express.Router();

// Import local modules
const User = require("../db/models/User");
const { ensureGuest } = require("../utils/utilFunctions");

// @desc    Show password reset page
// @route   GET /reset/:email/:token
router.get("/:email/:token", ensureGuest, (req, res) => {
  res.render("resetPassword", {
    email: req.params.email,
  });
});

// @desc    Change password
// @route   PUT /reset/change/:email
router.put("/change/:email", ensureGuest, async (req, res) => {
  try {
    // Get form values
    const { password, password2 } = req.body;

    // Check password strength
    if (password.length < 6) {
      return res.render("resetPassword", {
        email: req.params.email,
        error: "Password should be atleast 6 digits long.",
      });
    }

    // Confirm password
    if (password !== password2) {
      return res.render("resetPassword", {
        email: req.params.email,
        error: "Passwords do not match.",
      });
    }

    // Update user password
    const user = await User.findOne({ email: req.params.email });
    user.password = password;

    // Save user
    await user.save();

    // Redirect to login
    req.flash("success_msg", "Password changed.");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("errors/500");
  }
});

// Export router
module.exports = router;
