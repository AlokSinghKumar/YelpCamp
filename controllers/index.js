var user = require("../models/user");

exports.landingPage = (req, res) => {
    res.render("landing.ejs");
}

exports.signupForm = (req, res) => {
    res.render("register.ejs");
}

exports.signup = (req, res) => {
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
}

exports.loginForm = (req, res) => {
    res.render("login.ejs");
}

exports.logout = (req, res) => {
    req.logout();
	req.flash("success", "Logged your out!");
	res.redirect("/campgrounds");
}

