var express = require("express");
var campground = require("../models/campground");

exports.showCampgorunds = (req, res) => {
    //Get all campgrounds from database
	campground.find({}, (err, allcampgrounds) =>{
		if(err)
			console.log(err);
		else{
			res.render("campgrounds/index.ejs", {campgrounds: allcampgrounds, currentuser: req.user});
		}
	});
}

exports.newCampground = (req, res) => {
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
	
	//Create a new campground and save to the database
	campground.create(newCampground, (err, newlyCreated) =>{
		if(err){
			console.log(err);
		} else {
			//redirect to the campground page
			res.redirect("/campgrounds");
		}
	});
}

exports.moreInfo = (req, res) => {
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
}

exports.editCampgroundForm = (req, res) => {
    campground.findById(req.params.id, (err, foundcampground) => {
		res.render("campgrounds/edit.ejs", {campground: foundcampground});
	});
}

exports.editCampground = (req, res) => {
    //find and update the correct campgrounds
	campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
			res.redirect("/campgrounds");
		} else {
			//redirect somewhere(show page)
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
}

exports.deleteCampground = (req, res) => {
    campground.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
}