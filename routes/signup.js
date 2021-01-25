// Import npm modules
const express = require("express");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const router = express.Router();

// Import local modules
const User = require("../db/models/User");
const InactiveUser = require("../db/models/Inactive");
const { ensureGuest } = require("../utils/utilFunctions");

// @desc    Show signup page
// @route   GET /signup
router.get("/", ensureGuest, (req, res) => {
  res.render("signup");
});

// @desc    Create new user
// @route   POST /signup
router.post("/", ensureGuest, async (req, res) => {
  try {
    // Get form details
    const { username, email, password, password2 } = req.body;

    // Check username availability
    const user = await User.findOne({ username });

    // Verify
    if (user) {
      return res.render("signup", {
        error: "Username taken",
        username,
        email,
        password,
        password2,
      });
    }

    // Check email availability
    const isEmail = await User.findOne({ email });
    const InactiveisEmail = await InactiveUser.findOne({ email });

    // Verify
    if (isEmail || InactiveisEmail) {
      return res.render("signup", {
        error: "Account already exists",
        username,
        email,
        password,
        password2,
      });
    }

    // Check password strength
    if (password.length < 6) {
      return res.render("signup", {
        error: "Password should be atleast 6 characters long",
        username,
        email,
        password,
        password2,
      });
    }

    // Confirm password
    if (password !== password2) {
      return res.render("signup", {
        error: "Passwords do not match",
        username,
        email,
        password,
        password2,
      });
    }

    // Create new user
    const newUser = new InactiveUser({ username, email, password });

    // Finally ... Save user to database
    await newUser.save();

    // Create mail transporter
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL_ID, // generated ethereal user
        pass: process.env.GMAIL_PASSWORD, // generated ethereal password
      },
    });

    // Encode userID in jwt
    const emailToken = jwt.sign(
      { user: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
      (err, emailToken) => {
        const url = `https://${req.headers.host}/confirmation/${emailToken}`;

        transporter.sendMail({
          from: "Your Recipie", // sender address
          to: newUser.email, // list of receivers
          subject: "Email Confirmation", // Subject line
          html: `
            <h1>Hello ${newUser.username}</h1>
            <p>This link will expire in 10 minutes.</p>
            <h3>Click on this link to confirm</h3>
            <p class='lead'>${url}</p>
          `,
        });

        // Alert user to confirm email
        res.redirect(`/alert/${newUser.email}`);
      }
    );
  } catch (err) {
    res.render("/errors/500");
  }
});

// Export router
module.exports = router;
