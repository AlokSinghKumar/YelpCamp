var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var middleware = require("../middleware");

// =======================
// 	INDEX ROUTE
// =======================
router.get("/campgrounds", function(req, res){
	//Get all campgrounds from database
	campground.find({}, function(err, allcampgrounds){
		if(err)
			console.log(err);
		else{
			res.render("campgrounds/index.ejs", {campgrounds: allcampgrounds, currentuser: req.user});
		}
	});	
});

router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
	//get data from form and add to campgroung array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	//for making in object format
	var newCampground = {name: name, price: price, image: image, description: desc, author: author}
	
	
	// //pusing the neCampground data to the array
	// campgrounds.push(newCampground);
	
	//Create a new campground and save to the database
	campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect to the campground page
			res.redirect("/campgrounds");
		}
	});
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about campground
router.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){ //foundCampground is null
			req.flash('error', 'Campground not found');
			res.redirect("back");
		}
		else{
			//render show tabplet with he campground
			res.render("campgrounds/show.ejs", {campground: foundCampground, currentuser: req.user});
		}
	});
});

//EDIT CAMPGROUND ROUTE
 router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, (req, res) =>  {
	campground.findById(req.params.id, (err, foundcampground) => {
		res.render("campgrounds/edit.ejs", {campground: foundcampground});
	});
});

//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, (req, res) => {
	//find and update the correct campgrounds
	campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
			res.redirect("/campgrounds");
		} else {
			//redirect somewhere(show page)
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, (req, res) => {
	campground.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;