var express = require("express");
var app = express();
var bodyParser = require ("body-parser");
var mongoose = require("mongoose");
//requires express libraries

var passport = require("passport")
var LocalStrategy = require("passport-local")


var User = require('./models/user')

// Using .env file (safe)
require('dotenv').config();


//CONNECT TO MONGODB*********************************
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
//*************************************************** */

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


//Check if mongo is connected
mongoose.connection.on('connected',() =>{
    console.log("MONGOOSE IS CONNECTED");
});

//So that we can use methods provided by the express framework
//PASPORT CONFIG

// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(require("express-session")({
    secret:"Once again Rusty",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//SCHEMA SETUP
var donationsSchema = new mongoose.Schema({
    name:String,
    item: String,
    address:String,
    author: {
        id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    username:String
    }
})

var Donation = mongoose.model("Donation",donationsSchema)

app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render("landing");
})

app.get('/donations',isLoggedIn,function(req,res){
    Donation.find({},function(err,donations){
        if(err){
            console.log(err);
        }else{
            res.render("donations",{donations: donations});
        }
    });
});

app.post('/donations',isLoggedIn,function(req,res){
    var name = req.body.name;
    var item = req.body.item;
    var address = req.body.address;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newDonationObject = {name:name,item:item,address:address,author:author};
    console.log(req.user);
    //info about currently logged in user

    
    //this req.body gives me the value attached to name attribute in ejs file
    //create a new donations object insid ethe mongodb
    Donation.create(newDonationObject,function(err,newlyCreated){
        if (err){
            console.log(err);
        }else{
            console.log(newlyCreated)
            res.redirect("/donations")
        }
    });
});
//NEW SHOW FORM TO CREATE A NEW DONATION
app.get('/donations/new',isLoggedIn,function(req,res){
    res.render('newDonation.ejs')
})
//SHOW-Shows more info on the donation and current status
app.get("/donations/:id",function(req,res){
    //view the users own donation with the given id
    res.render("show");
})
//===================
//AUTH ROUTES
//===================
//SHOW REGISTER FORM
app.get("/register",function(req,res){
    res.render("register")
});
//HANDLE SIGNUP LOGIC
app.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/donations");
        });
    });
        
    //method of user given by passport
});

//show login form
app.get('/login',function(req,res){
    res.render('login');
})


//handling login logic
// app.post("/login",middleware,callback) this format
app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/donations",
        failureRedirect:"/register"
}), function(req,res){
    console.log(err);
})

//logout route
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/")
})
//MIDDLEWARE TO MAKE SURE THAT PEOPLE ARE LOGGED IN
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
        //goes to the next piece of code aka permits access to route
    }
    res.redirect("/login")
}
app.listen(3000,function(){
    console.log('Server listening on Port 3000!')
});


//To listen on port 3000