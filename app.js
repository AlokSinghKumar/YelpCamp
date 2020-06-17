var express = require("express"),
	flash = require("connect-flash"),
	app = express(),
	bodyparser = require("body-parser"),
 	mongoose = require("mongoose"),
 	campground = require("./models/campground"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	user = require("./models/user"),
	comment = require("./models/comment"),
	methodOverride = require("method-override"),
	session = require('express-session');

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");
	

// seedDB(); 	//seed database
mongoose.connect("mongodb://localhost:27017/yelp_camp_alok", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useUnifiedTopology', true);
app.use(bodyparser.urlencoded({extended:  true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//this is for flast session connection (not in bootcamp)
app.use(session({
	cookie: { maxAge: 60000 }, 
	secret: 'woot',
    resave: false, 
    saveUninitialized: false}) 
); 

app.use(function(req, res, next) {
	res.locals.currentuser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "alok kumar singh",
	resave: false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000, function(){
	console.log("server started");
});