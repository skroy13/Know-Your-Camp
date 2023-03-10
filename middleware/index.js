var	Campground  = require("../models/campground"),
	Comment 	= require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	//is user logged in
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found");
				res.redirect("back");
			}
			else{
				//does user owned the campground
				if(foundCampground.author.id.equals(req.user._id)){
					next();
					
				} else {
					req.flash("error", "You don't have permission to do that!!!");
					res.redirect("back");
					}
				}
				});
	}else {
		req.flash("error", "Login Required");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	//is user logged in
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Comment not found");
				res.redirect("back");
			}
			else{
				//does user owned the comment
				if(foundComment.author.id.equals(req.user._id)){
					next();
					
				} else {
					req.flash("error", "You don't have permission to do that!!!");
					res.redirect("back");
				}
			}
		});
	}else {
		req.flash("error", "Login Required");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Login Required");
	res.redirect("/login");
}

module.exports = middlewareObj;