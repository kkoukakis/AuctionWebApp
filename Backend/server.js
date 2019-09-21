//----------------------//
//   S E R V E R . j s  // 
//----------------------//

// Libraries
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

//Variables and Files
const config = require('./config')
const tokenList = {};

//body parser configuration
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



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

    next();
});


//------------------
//ALL ROUTES FOR API
//------------------

var router = app;

// login

router.post('/login' , (req,res) => {
    const postData = req.body;
    console.log('LOGINATTEMPT | req.body: '+ JSON.stringify(postData));
    const user = {
        "username": postData.u
    }
    var wrong = true;
    var success = false;
    // database authentication here, with username and password combination.
    var query = 'SELECT * from user WHERE UserID = \'' + postData.u +'\' AND Password = \'' + postData.p +'\'';
    console.log('Q:'+query);
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if(results != null){
            if(results == ""){
             success = true;
             wrong = true;
            }else{
                wrong = false;
                
             console.log(JSON.stringify({"response": results}));
            }
        }
        else{ 
            success = false;
        }
    });

    if(success == true && wrong == false){
    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
        "username": postData.u
    }
    tokenList[refreshToken] = response

    var query = 'INSERT * INTO user ()WHERE UserID = \'' + postData.u +'\' AND Password = \'' + postData.p +'\'';
    

    res.status(200).json(response);
    
    console.log('SUCCESS LOGIN '+ response.token)
    }
    else{
        
        console.log('ERROR LOGIN [wrong password]:'+wrong + '[success:]'+success)
        if(wrong == true){
            res.status(200).json({"response": null});
           }
        if(success == false){
        res.status(500).json({"response": null});
        }
      
    }   
})









router.get('/user/auth/:UserID', function(req, res) {
    console.log(req.params.UserID);
    var query = 'SELECT * from user WHERE UserID = \'' + req.params.UserID +'\'';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if(results != null)
             res.send(JSON.stringify({"response": results}));
        else{ 
            res.send(JSON.stringify({"response": null}));
        }
        console.log("["+query+"]" + JSON.stringify({"response": results}));
        console.log("---");
    });
}); 





router.get('/users', function(req, res) {
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
