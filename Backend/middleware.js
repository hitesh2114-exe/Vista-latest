const passport = require("passport");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    //this is function of passport.js to check the authentication of user
    console.log("isLoggedIn working");
    return next();
  }
  res.status(401).json({
    success: "false",
    message: "Please login first",
  });
};

const loginAuth = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //passport.authenticate() is a passport-local-mongoose function
    // Handle unexpected server errors
    if (err) {
      return next(err);
    }

    // Authentication failed
    if (!user) {
      console.log("incorrect password or user");
      return res.status(401).json({
        success: false,
        message: info?.message || "Invalid username or password",
      });
    }

    console.log("loginAuth working");
    // Establish login session
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      // Passport attaches the user to req.user
      next();
    });
  })(req, res, next);
};

/**
 * Login Authentication Middleware
 *
 * Purpose:
 * This middleware is used only for the login route.
 *
 * Why do we need it?
 * By default, passport.authenticate("local") sends a
 * generic "401 Unauthorized" response when authentication fails.
 *
 * Using a custom callback allows us to:
 * 1. Send our own error message.
 * 2. Control the response format.
 * 3. Continue to the controller on successful login.
 */

module.exports = { isLoggedIn, loginAuth };
