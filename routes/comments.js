var express = require("express");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware");
var {newCommentForm, newComment, editCommentForm, editComment, deleteComment} = require("../controllers/comments");

//new comment
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, newCommentForm)
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, newComment)

//COMMENT EDIT ROUTES
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, editCommentForm) 
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, editComment)

//COMMENT DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, deleteComment)

module.exports = router;