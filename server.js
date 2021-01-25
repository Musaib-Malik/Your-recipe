// Import npm modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

// Import local modules
const connectDB = require("./db/connect");
const indexRoute = require("./routes/index");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const forgotPasswordRoute = require("./routes/forgotPassword");
const resetPasswordRoute = require("./routes/resetPassword");
const accountConfirmationRoute = require("./routes/accountConfirmation");
const alertsRoute = require("./routes/alerts");
const dashboardRoute = require("./routes/dashboard");
const addRecipieRoute = require("./routes/recipies/recipies");
const configurePassport = require("./config/passport");

// Load config file
dotenv.config({ path: "./config/vars.env" });

// Connect with database
connectDB();

// Instantiate express server
const app = express();

// Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// EJS
app.set("view engine", "ejs");

// Main middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      autoRemoveInterval: 3600,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function globalVars(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  // Next
  next();
});

// Configure passport
configurePassport(passport);

// Routes
app.use("/", indexRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/dashboard", dashboardRoute);
app.use("/recipies", addRecipieRoute);
app.use("/confirmation", accountConfirmationRoute);
app.use("/alert", alertsRoute);
app.use("/forgot", forgotPasswordRoute);
app.use("/reset", resetPasswordRoute);

// 404 route
app.get("/*", (req, res) => {
  res.render("errors/404");
});

// Start listening
const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`)
);
