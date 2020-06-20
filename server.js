'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');
var helmet      = require('helmet');
var path        = require('path')
require('dotenv').config();

var apiRoutes   = require('./client/routes/api.js');

var app = express();

app.use(helmet.xssFilter());
app.use(helmet.frameguard({action: 'sameorigin'}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.referrerPolicy({ policy: 'same-origin'}));

// get style.css served to board.html
app.use(express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sample front-end
app.get('/css', (req, res) => {
  res.sendFile(process.cwd() + '/client/build/style.css')
})
app.route('/b/:board/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/client/build/board.html');
  });
app.route('/b/:board/:threadid')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/client/build/thread.html');
  });

 


//Routing for API 
apiRoutes(app);

//Sample Front end

    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port " + process.env.PORT);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static('client/build'));
   
  
  // Handle React routing, return all requests to React app
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

/*
//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/client/build/index.html');
  });
*/

module.exports = app; //for testing
