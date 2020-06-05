var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");


router.get("/", function(req, res){
	 res.render("landing.ejs");
});

// ======================================
// 	AUTHENTICATION ROUTE
// ======================================

router.get("/register", (req, res) => {
	res.render("register.ejs");
});


router.post("/register", (req, res) => {
	var newuser = new user({username: req.body.username})
	// console.log(req.body.username, req.body.password);
	user.register(newuser, req.body.password, (err, user) => {
		if(err){
			console.log(err);
			req.flash("error", "username already registered");
			res.redirect("register")
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});


// show login forma
router.get("/login", (req, res) => {
	res.render("login.ejs");
});

router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureFlash: "Invalid username or password.",failureRedirect: "/login"}));

//logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged your out!");
	res.redirect("/campgrounds");
});

module.exports = router;