var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var mdb = require('./mongodb');
var path = require('path');
var cors = require('cors')
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extented: true
}));
app.use(cors());

app.set('superSecret', config.secret);
const controller='./app/controllers/';

var middleware = require(`${controller}middleware.js`)(app);
var pets = require(`${controller}Pets/petsCtrl.js`)(app);
var users = require(`${controller}Users/usersCtrl.js`)(app);
var interests = require(`${controller}Interests/interestsCtrl.js`)(app);
var sourceFeed = require(`${controller}Feeds/sourceFeedsCtrl.js`)(app);
var yt3 = require(`${controller}googleapis.js`)(app);
var twitter = require(`${controller}twitter.js`)(app);


// use morgan to log requests to the console
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'));
})
app.get('/cat', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'));
})

process.on('uncaughtException', function (err) {
    fs.writeFile("error.txt", err, "utf8");
})


app.listen(3000, function () {
     console.log(`Server running at whatever ${3000}`);
 });
