const
  express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  dotenv = require('dotenv').load(),
  morgan = require('morgan'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose'),
  User = require('./models/user')
const
  PORT = 3000,
  app = express()

// connect to mongo
mongoose.connect('mongodb://localhost/movie_troll')
// express middleware
app.use(morgan('dev'))
// pull static files from public directory
app.use(express.static(__dirname + '/public'))
// use ejs for rendering
app.set('view engine', 'ejs')
// parse to deal with nested objects
app.use(bodyParser.urlencoded({extended:true}));

// require and use session in one swoop,
// secret required to encode/decode session data
app.use(require("express-session")({
  secret: "Luna is the best dog in the world",
  resave: false,
  saveUninitialized: false
}));
//  Auth middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//console.log(process.env.MDB_API_KEY)

//  API Search===============
// app.get('/search/:searchTerm', (req, res) => {
//   var searchTerm = req.params.searchTerm;
//   var apiUrl = 'https://api.themoviedb.org/3/movie/550?api_key='
//   var apiKey = process.env.MDB_API_KEY
//   var requestUrl = `${apiUrl}${apiKey}`
// })

//  ROUTES=========================
app.get('/',function(req,res){
  res.render('home');
});

app.get('/secret', isLoggedIn, function(req, res){
  res.render('secret')
});

// AUTH ROUTEs=================
// render SIGN UP form
app.get('/signup', function(req, res){
  res.render('signup');
});

// post to create a new USER
app.post('/signup', function(req, res){
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render('signup');
    }
    passport.authenticate("local")(req,res,function(){
      res.redirect('/secret');
    });
  });
});

// LOG IN ROUTE
app.get("/login", function(req, res){
  res.render("login")
});

// Create a SESSION
app.post('/login', passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(req, res){
});

// DESTROY SEssion/ logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/')
})


// middleware to check status
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}



app.listen(PORT, function(err){
  console.log(err || `Server is listening on port ${PORT}`)
})
