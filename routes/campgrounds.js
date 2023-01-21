var express 	= require("express"),
	router  	= express.Router(),
	Campground  = require("../models/campground"),
	middleware  = require("../middleware");

//index route
router.get("/", function(req,res){
	Campground.find({}, function(err, campgrounds){
		if(err) 
			console.log(err);
		else 
			res.render("campgrounds/index", {campgrounds:campgrounds, currentUser: req.user});
	});
	
});

//create route
router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.create({
		name: req.body.campground.name,
		image: req.body.campground.image,
		description: req.body.campground.description,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	}, function(err, campground){
		if(err){
		 req.flash("error", "Something went wrong!!!");
		 console.log(err);
		}
		else{
			req.flash("success", "Succssfully added campground");
			res.redirect("/campgrounds");
		} 
	});
});

//new route
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

//show route
router.get("/:id", function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err) 
			console.log(err);
		else{
			// console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
	res.render("campgrounds/edit", {campground: foundCampground});
	});
});

//update
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//delete
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			req.flash("success", "Campground deleted...");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;