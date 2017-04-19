
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
const firebase = require("firebase");
const bodyParser = require('body-parser');
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
var handlebars = require('express3-handlebars').create({
  defaultLayout:'main',
  helpers: {
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
       return null;
    },
    static: function(name) {
      return require('./lib/static.js').map(name);
  }
  }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true })); 

// session setup
var expressSession = require('express-session');
app.use(express.static(__dirname + '/public'));
var cookieParser = require('cookie-parser');
// must use cookieParser before expressSession
app.use(cookieParser());

app.use(expressSession({secret:'smilesh2o24Andela'}));



function adminOnly(req, res, next){
	if(req.session.uid && req.session.role==='admin') return next();
		//
		next('route');
}


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
	console.log(firebase.auth.currentuser)
	res.render('signup');
});
app.post('/signup', function(req,res){
	/** todo 
			using firebase email signin
			push user info into db
			if he uses email use firebase email and password to create new user
			redirect to home page
	**/
});


app.use(function(req,res,next){
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    req.session.uid = user.uid;
    console.log(user);
  } else {
    // No user is signed in.
  }
	});
	if(req.session.uid)  return next();
	res.render('login');
});

app.get('/issue', function(req,res){
	/** todo 
		render issue registration page
	**/
});

app.post('/signup', function(req,res){
	/** todo 
			push issue 
			redirect to issue log
	**/

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