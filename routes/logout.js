// Import npm modules
const express = require("express");
const router = express.Router();

// @desc    Logout from session
// @route   GET /logout
router.get("/", (req, res) => {
  // Logout
  req.logOut();

  // Redirect
  req.flash("success_msg", "You are successfully logged out.");
  res.redirect("/login");
});

// Export router
module.exports = router;
