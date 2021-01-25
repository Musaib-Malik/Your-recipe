// Import npm modules
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Import local modules
const User = require("../db/models/User");

// Configure passport
const configurePassport = (passport) => {
  // Main function
  const main = async (username, password, done) => {
    try {
      // Find user in database
      const user = await User.findOne({ username });

      // Check if user exists
      if (!user) {
        return done(null, false, { message: "User not found." });
      }

      // Check password
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: "Invalid credentials." });
      }

      // Return user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };

  // Middleware
  passport.use(new LocalStrategy({}, main));

  // Serialize & Deserialize user
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};

// Export configuration
module.exports = configurePassport;
