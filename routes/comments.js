var express = require("express");
var router = express.Router({mergeParams: true});
var campground = require("../models/campground");
var comment = require("../models/comment");
var middleware = require("../middleware");

//creating new comment
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn , (req, res) => {
	//find campground by id
	campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new.ejs", {campground: campground});
		}
	});
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, (req, res) => {
	//lookup campground using ID
	campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
			redirect("/campgrounds");
		} else {
			comment.create(req.body.comment, (err, comment)=> {
				if(err){
					req.flash("error", "something went wrong");
					console.log(err);
				}
				else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("sucess", "sucessfuly added comment!");
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
	
});


//COMMENT EDIT ROUTES
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
	campground.findById(req.params.id, (err, foundcampground) => {
		if(err || !foundcampground){
			req.flash("error", "no campground found");
			return res.redirect("back");
		}
		comment.findById(req.params.comment_id, (err, foundcomment) => {
			if(err){
				res.redirect("back");
			} else{
				res.render("comments/edit.ejs", {campground_id: req.params.id, comment: foundcomment});
			}
		})
	});
});

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedcomment) => {
		if(err){
			res.render("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

//COMMENT DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	//findByidAndRemove
	comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if(err){
			req.flash("error", "unable to delete comment");
			res.redirect("back");
		} else {
			req.flash("success", "comment deleted");
			res.redirect("back");
		}
	});
});

module.exports = router;