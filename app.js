var express 		 = require("express"),
	app 			 = express(), 
	bodyParser 		 = require("body-parser"),
	mongoose 		 = require("mongoose"),
	passport 		 = require("passport"),
	LocalStrategy	 = require("passport-local"),
	methodOverride	 = require("method-override"),
	flash 			 = require("connect-flash"),
	seedDB			 = require("./seeds"),
	Campground 		 = require("./models/campground"),
	Comment 		 = require("./models/comment"),
	User 			 = require("./models/user"),
	commentRoutes	 = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	authRoutes		 = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp2");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();//seed the database 

//passport config
app.use(require("express-session")({
	secret: "Secret Page",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
	console.log("Yelp Camp Server has started...");
});