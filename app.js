var express    =require("express"),
    app        =express(),
    bodyParser =require("body-parser"),
    mongoose   =require("mongoose"),
    flash      =require("connect-flash"),
    passport   =require("passport"),
    LocalStratrgy=require("passport-local"),
    methodOverride = require("method-override"),
    Campground =require("./models/campground"),
    Comment    =require("./models/comment"),
    User       =require("./models/user"),
    seedDB     =require("./seeds");
  
  //requiring ROUTES
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes   =require("./routes/index");

//mongoose.connect("mongodb://localhost/yelp_camp_10", {useMongoClient: true});
mongoose.connect("mongodb://THEAXE:Tanmay@123@ds261527.mlab.com:61527/yelpcamp_t", {useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true})) ;
app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();
 
 //PASSPORT CONFI
 app.use(require("express-session")({
       secret :"nimmu is my love ......",
       resave :false,
       saveUninitialized :false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStratrgy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
      res.locals.currentUser=req.user;
      res.locals.error    =req.flash("error");
      res.locals.success    =req.flash("success");
      next();
});

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("APP HAS BEEN STARTED");   
});