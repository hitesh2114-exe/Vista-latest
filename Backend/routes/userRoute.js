const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const { loginAuth } = require("../middleware");
const { isLoggedIn } = require("../middleware");

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", loginAuth, userController.login);
userRouter.get("/logout", userController.logout);
userRouter.get("/me", isLoggedIn, userController.currentUser);

module.exports = userRouter;
