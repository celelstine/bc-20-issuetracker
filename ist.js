
var express = require('express');
var app = express();

const firebase = require("firebase");
const bodyParser = require('body-parser');
// session setup
var session = require('express-session');
var cookieParser = require('cookie-parser');

// must use cookieParser before expressSession
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}));

app.set('port', process.env.PORT || 3000);
// Initialize Firebase
var config = {
  apiKey: "AIzaSyABfpbd-dGQ97txyD37v98jZAkr0Dj8Qic",
  authDomain: "issuetracker-cf5ed.firebaseapp.com",
  databaseURL: "https://issuetracker-cf5ed.firebaseio.com",
  projectId: "issuetracker-cf5ed",
  storageBucket: "issuetracker-cf5ed.appspot.com",
  messagingSenderId: "363562248700"
};
  firebase.initializeApp(config);
// set up handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true })); 




app.use(express.static(__dirname + '/public'));
var utility = require('./lib/utility.js')

function adminOnly(req, res, next){
	if(req.session.uid && req.session.role==='admin') return next();
		//
		next('route');
}

app.post('/setsession', function(req,res){
		req.session.uid= req.body.uid;
		req.session.save();
		//console.log(req.session.uid);
});
app.get('/login', function(req,res){
	res.render('login');
});
app.post('/login', function(req,res){
	/** todo using firebase emal signin
		if user exist redirect to home page
		else display failure error
	**/
});
app.get('/', function(req,res){
	res.render('home');
});
app.get('/signup', function(req,res){
	/** todo using firebase emal signin
		check if user used a third party
		retrun his deatials
	**/
	res.render('signup');
});


app.post('/signup', function(req,res){
		console.log(req.session.uid);
	var email=req.body.email,
    department=req.body.department,
    name=req.body.name;
    userRef = firebase.database().ref('ist/user');
	var  newuser = {
    "name" : name,
    "departments" : department,
    "uid" : req.session.uid,
    "email" : email
  };
  console.log(newuser);
  userRef.push(newuser).then(function(user) {
    res.redirect('/');
  }). catch(function(error) {
    console.error('Sign Out Error', error);
    res.redirect('/login');
  });
});

/**
app.use(function(req,res,next){
	if(req.session.uid)  return next();
	//console.log(req.session.uid);
	res.redirect('/login');
});
**/
app.get('/issue', function(req,res){
	res.render('issue');
});

app.post('/issue', function(req,res){
	var subject=req.body.subject,
    department=req.body.department,
    description=req.body.description;
    priority=req.body.priority;
    Issueref = firebase.database().ref('ist/issue');
	var  newissue = {
        "raisedby" : req.session.uid,
        "dateraised" : utility(),
        "status" : "Initiated",
        "description" : description,
        "department" : department,
        "subject" : subject,
        "comment" : {
        },
        "lastupdate" : utility(),
        "timeclose" : "",
        "sendernotificationmeans"  : "phone",
        "notificationvalue" : "08066112787",
        "isnotified" : false,
        "fixernote" : ""
      };
  console.log(newissue);
  Issueref.push(newissue).then(function(issue) {
    res.redirect('/');
  }). catch(function(error) {
    console.error('Sign Out Error', error);
    res.redirect('/login');
  });

});

app.get('/issuelog', function(req,res){
	/** todo 
		collect every issue of the user
		render issue log page
	**/
});

app.get('/todo', function(req,res){
	/** todo 
		collect every issue assigned to the user
		render issue todo page
	**/
});

app.get('/tododetail', function(req,res){
	/** todo 
		collect details of an issue 
		render issue tododeatials page
	**/
});

app.get('/openissue', adminOnly,function(req,res){
	/** todo 
		collect every open issue  
		render issue openissue page
	**/
});

app.get('/closeissue',adminOnly, function(req,res){
	/** todo 
		collect every close issue  
		render issue closeissue page
	**/
});

app.get('/adminissue', adminOnly,function(req,res){
	/** todo 
		collect display full issue page 
		render issue adminissuedetail page
	**/
});



// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('505');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.' );
});