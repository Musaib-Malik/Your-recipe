// Import npm modules
const express = require("express");
const passport = require("passport");
const router = express.Router();

// Import local modules
const { ensureGuest } = require("../utils/utilFunctions");

// @desc    Show login page
// @route   GET /login
router.get("/", ensureGuest, (req, res) => {
  res.render("login");
});

// @desc    Process login request
// @route   POST /login
router.post(
  "/",
  ensureGuest,
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Export router
module.exports = router;
