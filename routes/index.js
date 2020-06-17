var express = require("express");
var router = express.Router();
var passport = require("passport");
const {landingPage, signup, loginForm, logout, signupForm} = require("../controllers/index");
router.get("/", landingPage);

// ======================================
// 	AUTHENTICATION ROUTE
// ======================================

//Registration routes
router.get("/register", signupForm);
router.post("/register", signup);


//login Routes
router.get("/login", loginForm);
router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureFlash: "Invalid username or password.",failureRedirect: "/login"}));

//logout route
router.get("/logout", logout);

module.exports = router;