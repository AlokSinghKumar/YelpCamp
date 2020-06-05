var campground = require("../models/campground");
var comment = require("../models/comment");
//all middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){ 
		campground.findById(req.params.id, (err, foundcampground) => {
			 if(err){
				 req.flash("error", "campground not found");
				 res.redirect("back");
			 } else {
				 //does user owns the campground?
				 if(foundcampground.author.id.equals(req.user._id)){
					 
					 next();
				 } else {
					 req.flash("error", "You do not have permission to do that");
					 res.redirect("back");
				 }
			 }
		});
	} else {
		 req.flash("error", "you need to be logged in to do that");
		 res.redirect("back");
	};
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "you need to be logged in to do that");
	res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){ 
		comment.findById(req.params.comment_id, (err, foundcomment) => {
			 if(err || !foundcomment){
				 req.flash("error", "camment not found");
				 res.redirect("back");
			 } else {
				 //does user owns the comment?
				 if(foundcomment.author.id.equals(req.user._id)){
					 next();
				 } else {
					 req.flash("error", "You do not have permission to do that");
					 res.redirect("back");
				 }
			 }
		});
	} else {
		 req.flash("error", "you need to be logged in to do that");
		 res.redirect("back");
	};
}

module.exports = middlewareObj;