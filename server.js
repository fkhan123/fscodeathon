var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
//var dbConfig = require('./dbconfig.js');
var orDb = require('./select2.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8088;        // set our port

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
	orDb.getEnvs('',null).then(function(data){
		//success
		console.log('success' + data);
		res.json(data.rows);   
	},function(errorMsg){
		//error
		console.log('error' + errorMsg);
		res.json({ message: 'failed' });   
	});
})

//app.get('/:id', function (req, res) {
   // First read existing users.
   /*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });*/
//})

//app.post('/addUser', function (req, res) {
   // First read existing users.
   /*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });*/
//})
router.get('/:name', function(req, res) {
	orDb.getEnvs('',req.params.name).then(function(data){
		//success
		console.log('success' + data);
		res.json(data.rows);   
	},function(errorMsg){
		//error
		console.log('error' + errorMsg);
		res.json({ message: 'failed' });   
	});
    
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Service running on ' + port);