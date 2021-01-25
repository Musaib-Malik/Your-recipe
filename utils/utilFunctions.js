// Import moment
const moment = require("moment");

// Utility functions
module.exports = {
  formatDate: function (date, format) {
    return moment(date).utc().format(format);
  },
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash("error_msg", "Please login to access this resource.");
    res.redirect("/login");
  },

  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    }

    next();
  },
};
