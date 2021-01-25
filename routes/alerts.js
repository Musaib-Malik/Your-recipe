// Import NPM modules
const express = require("express");
const router = express.Router();

// Import local modules
const { ensureGuest } = require("../utils/utilFunctions");

// @desc    Alert user to confirm email
// @route   GET /alert
router.get("/:newUserEmail", ensureGuest, (req, res) => {
  res.render("alert", { newEmail: req.params.newUserEmail });
});

// @desc    Alert user to reset password
// @route   GET /alert/reset
router.get("/resetPassword/:userEmail", ensureGuest, (req, res) => {
  res.render("alert", { email: req.params.userEmail });
});

// Export Router
module.exports = router;
