var	mongoose 		= require("mongoose"),
	Campground 		= require("./models/campground"),
	Comment 		= require("./models/comment");

var data =[
	{
		name: "The God's View",
		image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		description: "Campground consists typically of open pieces of ground where a camper can pitch a tent or park a camper. More specifically a campsite is a dedicated area set aside for camping and for which often a user fee is charged. Campsites typically feature a few (but sometimes no) improvements."
	},
	{
		name: "The Lakes View",
		image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		description: "Campground consists typically of open pieces of ground where a camper can pitch a tent or park a camper. More specifically a campsite is a dedicated area set aside for camping and for which often a user fee is charged. Campsites typically feature a few (but sometimes no) improvements."
	},
	{
		name: "The Clouds Rest",
		image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		description: "Campground consists typically of open pieces of ground where a camper can pitch a tent or park a camper. More specifically a campsite is a dedicated area set aside for camping and for which often a user fee is charged. Campsites typically feature a few (but sometimes no) improvements."
	}
];
function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if(err) console.log(err);
		console.log("removed campgrounds");

		//add a few campgrounds
		// data.forEach(function(seed){
		// 	Campground.create(seed, function(err, campground){
		// 		if(err) console.log(err);
		// 		else {
		// 			console.log("added a campground");

		// 			//create comment
		// 			Comment.create(
		// 				{
		// 					text: "A great place but missing internet",
		// 					author: "Homer"
		// 				}, function(err, comment)
		// 				{
		// 					if(err) console.log(err);
		// 					else{
		// 						campground.comments.push(comment);
		// 						campground.save();
		// 						console.log("New comment created");
		// 					}
		// 				});
		// 		}
		// 	});
		// });
	});

	

}

module.exports = seedDB;