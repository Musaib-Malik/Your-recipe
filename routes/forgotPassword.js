// Import npm modules
const express = require("express");
const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Import local modules
const User = require("../db/models/User");
const { ensureGuest } = require("../utils/utilFunctions");

// @desc    Show forgot password page
// @route   GET /forgot
router.get("/", ensureGuest, (req, res) => {
  res.render("forgotPassword");
});

// @desc    Process forgot password request (Send reset token)
// @route   POST /forgot
router.post("/", ensureGuest, async (req, res) => {
  // Find user in database with the email
  const user = await User.findOne({ email: req.body.email });

  // If no user
  if (!user) {
    return res.render("forgotPassword", { error: "User not found!" });
  }

  // Create mail transporter
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GMAIL_ID, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });

  try {
    // Encode userID in jwt
    const forgotPasswordToken = jwt.sign(
      { user: user._id },
      process.env.FORGOT_PASSWORD_SECRET,
      { expiresIn: "10m" },
      (err, forgotPasswordToken) => {
        transporter.sendMail({
          from: "Your Recipie", // sender address
          to: req.body.email, // list of receivers
          subject: "Password Reset", // Subject line
          html: `
          <form action='https://${req.headers.host}/reset/${user.email}/${forgotPasswordToken}' method='GET'>
          <h1>Hello ${user.username}</h1>
          <p>This link will expire in 10 minutes.</p>
          <h3>Click on this link to reset your password:</h3>
          <button type='submit' class='btn'>Click here</button>
          </form>
        `,
        });
      }
    );

    // Redirect to success page
    res.redirect(`/alert/resetPassword/${req.body.email}`);
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
});

// Export router
module.exports = router;
