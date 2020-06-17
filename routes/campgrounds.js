var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
const {showCampgorunds, newCampground, moreInfo, editCampgroundForm,deleteCampground, editCampground} = require("../controllers/campgrounds");

// =======================
// 	INDEX ROUTE
// =======================
router.get("/campgrounds", showCampgorunds);
router.post("/campgrounds", middleware.isLoggedIn, newCampground) 

router.get("/campgrounds/new", middleware.isLoggedIn, (req, res) =>{
	res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about campground
router.get("/campgrounds/:id", moreInfo);

//EDIT CAMPGROUND ROUTE
 router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, editCampgroundForm);

//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership,editCampground);

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, deleteCampground);
module.exports = router;