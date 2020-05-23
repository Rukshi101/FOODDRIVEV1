var express = require("express");
var app = express();
var bodyParser = require ("body-parser");
var mongoose = require("mongoose");
const axios = require('axios');

//requires express libraries
var passport = require("passport")
var LocalStrategy = require("passport-local")


var User = require('./models/user')
var Donation = require('./models/donations')
var Trip = require('./models/trips')

// Using .env file (safe)
require('dotenv').config();

// Getting Geocode API Key
const BING_MAPS_KEY = process.env.BING_API_KEY;

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

app.set('view engine','ejs');

app.get('/',function(req,res){
    console.log(req.user)
    res.render("landing", {user: req.user});
})

app.get('/donations',isLoggedIn,function(req,res){
    Donation.find({},function(err,donations){
        if(err){
            console.log(err);
        }else{
            res.render("donations",{donations: donations, user: req.user});
        }
    });
});

app.post('/donations/new', isLoggedIn, function(req,res){
    var author = {
        id: req.user._id,
    }
    var newDonationObject = {
        author: author,
        product: req.body.product,
        status: 'pending'
    };
    console.log(req.user);
    //info about currently logged in user

    
    //this req.body gives me the value attached to name attribute in ejs file
    //create a new donations object insid ethe mongodb
    Donation.create(newDonationObject,function(err,newlyCreated){
        if (err){
            console.log(err);
        }
        else {
            console.log(newlyCreated)
            res.redirect("/donations")
        }
    });
});
//NEW SHOW FORM TO CREATE A NEW DONATION
app.get('/donations/new',isLoggedIn,function(req,res){
    res.render('newDonation', {user: req.user})
})

// Get JSON format of all donation objects in MongoDB
app.get('/donations/all', function(req,res){
    Donation.find()
     .then(donations => res.json(donations))
     .catch(err => res.status(400).json('Error: ' + err))
});

app.get('/donations/:id', function(req, res){
    Donation.findById(req.params.id)
        .then(donation => res.json(donation))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/donations/:id', function(req, res){
    Donation.findByIdAndDelete(req.params.id)
        .then(donation => res.json('Donation Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

app.post('/donations/:id/update', function(req,res) {
    Donation.findById(req.params.id)
        .then(donation => {
            author = req.body.author,
            product = req.body.product,
            status = req.body.status
            
            donation.save()
                .then(() => res.json('Donation updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})


//SHOW-Shows more info on the donation and current status
app.get("/donations/:id", function(req,res){
    //view the users own donation with the given id
    res.render("show");
})
//===================
//AUTH ROUTES
//===================
//SHOW REGISTER FORM
app.get("/register",function(req,res){
    res.render("register", {user: req.user})
});


//HANDLE SIGNUP LOGIC
app.post("/register", async function(req,res){

    var url = 'http://dev.virtualearth.net/REST/v1/Locations?postalCode=' + String(req.body.postal_code) + '&maxResults=1&key=' + String(BING_MAPS_KEY);

    var lat;

    var long;

    await axios.get(url)
    .then(response => { 
        lat = response.data['resourceSets'][0]['resources'][0]['point']['coordinates'][0];
        long = response.data['resourceSets'][0]['resources'][0]['point']['coordinates'][1];
    })
    .catch(error => {
        console.log(error)
    });

    console.log(req.body)
    console.log(lat)
    console.log(long)

    var newUser = new User({
        username:req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        postal_code: req.body.postal_code,
        longitude: long,
        latitude: lat
    });
    User.register(newUser, newUser.password,function(err,user){
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
    res.render('login', {user: req.user});
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