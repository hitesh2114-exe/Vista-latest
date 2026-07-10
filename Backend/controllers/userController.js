const User = require("../model/user");

const signUp = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let newUser = await new User({
      email,
      username,
    });
    const response = await User.register(newUser, password);
    req.login(response, (err) => {
      if (err) {
        return next(err);
      }
      // console.log("USER LOGGED IN:", req.user);
      return res.status(201).json({
        success: true,
        user: response,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    console.log("login working")
    console.log("User after login:", req.user);
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res, next) => {
  // console.log("Session:", req.session);
  // console.log("User:", req.user);

  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
};

const currentUser = (req, res) => {
  if (req.isAuthenticated()) {
    console.log("isAuthenticated() working");
    console.log(req.headers.cookie);
    console.log(req.session);
    console.log(req.user);
    return res.status(200).json({
      loggedIn: true,
      user: req.user,
      message: "above is the current user",
    });
  }

  return res.status(401).json({
    loggedIn: false,
    message: "there is some error in /me route",
  });
};

module.exports = { signUp, login, logout, currentUser };
