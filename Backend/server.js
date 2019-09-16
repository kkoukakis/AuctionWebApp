//----------------------//
//   S E R V E R . j s  // 
//----------------------//

// Libraries
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
//const users = require('./api/routes/users');



//------------------
//Database connection
//------------------
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '1234',
		database : 'auction_db'
	});
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected to DB");
    });
    //console.log('Connected to DB');
    next();
});


//------------------
//ALL ROUTES FOR API
//------------------

var router = app;
router.get('/user', function(req, res, next) {
    var query = 'SELECT * from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(JSON.stringify({"response": results}));
        console.log("["+query+"]" + JSON.stringify({"response": results}));
        console.log("---");
    });
}); 

router.get('/users', function(req, res, next) {
    var query = 'SELECT * from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //console.log("["+query+"]" + JSON.stringify({"status": 200, "error": null, "response": results}));
        //console.log("---");
    });
});

router.get('/user1', function(req, res, next) {
    var query = 'SELECT * from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        res.send(JSON.stringify(results));
        //console.log("["+query+"]" + JSON.stringify({"status": 200, "error": null, "response": results}));
        //console.log("---");
    });
});

router.get('/adduser', function(req, res, next) {
    var query = ' from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        res.send(JSON.stringify(results));
        //console.log("["+query+"]" + JSON.stringify({"status": 200, "error": null, "response": results}));
        //console.log("---");
    });
});

router.get('/bids', function(req, res, next) {
    var query = 'SELECT * from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //console.log("["+query+"]" + JSON.stringify({"status": 200, "error": null, "response": results}));
        //console.log("---");
    });
});

router.get('/bid', function(req, res, next) {
    var query = 'SELECT * from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        //console.log("["+query+"]" + JSON.stringify({"status": 200, "error": null, "response": results}));
        //console.log("---");
    });
});



//-----------------
// START THE SERVER
//-----------------
const  port = process.env.PORT || 3030;
app.listen(port);

console.log('Magic happens on port: ' + port);
