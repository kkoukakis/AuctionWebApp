//----------------------//
//   S E R V E R . j s  // 
//----------------------//

// Libraries
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const updatedb = require('./api/auth/updatedb.js')

//Variables and Files
const config = require('./auth-config.json')
const dbjson = require('./db-config.json')
const tokenList = {};

//body parser configuration
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//------------------
//Database connection
//------------------
app.use(function(req, res, next){
	global.connection = mysql.createConnection(dbjson);
    connection.connect(function(err) {
        if (err) throw err;
        console.log("DB request/connection");
    });

    next();
});


//------------------
//ALL ROUTES FOR API
//------------------

var router = app;



//---------//
//  login  //
//---------//

router.post('/login' , (req,res) => {
    const postData = req.body;
    console.log('START: /login');
    console.log('-------');
    console.log('LOGINATTEMPT | req.body: '+ JSON.stringify(postData));
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const user = {
        "username": postData.u
    }
    var wrong = true;
    var success = false;
    var dbtoken;
    var dbrtoken;
    var bl =0;
    // database authentication here, with username and password combination.
    var query = 'SELECT * from user WHERE UserID = \'' + postData.u +'\' AND Password = \'' + postData.p +'\'';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('Affected rows:'+results.length);
        if(results.length === 1){
            
             wrong = false;
             success = true;

             //var check = result + '.';
             bl = 1;
             const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
             const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
             const response = {
                 "status": "Logged in",
                 "token": token,
                 "refreshToken": refreshToken,
                 "username": postData.u
             }
             tokenList[refreshToken] = response
            //update token to db
           updatedb(token,refreshToken,user.username);
          
           
            console.log(tokenList);
            // console.log('SUCCESS LOGIN '+ response.token)
            // console.log('----------------------------')
            console.log('-------');
            console.log('END: /login');
             return res.status(200).json(response);
         
        }else{ 
            success = false;
            bl = 1;
                console.log('ERROR LOGIN [wrong password]:'+ wrong + '[success:]'+success)
                if(wrong === true){
                    console.log('-------w');
                    console.log('END: /login');
                     return res.status(200).json({"token": "wrong"});
                   }
                if(success === false){
                    console.log('-------s');
                    console.log('END: /login');
                    return  res.status(500).json({"token": null});
                }
              
        }   
        
    });
  
})



//---------//
//  token  //
//---------//
router.post('/token', (req,res) => {
    console.log('/token');
    // refresh the damn token
    const postData = req.body
    // if refresh token exists
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "username": postData.u
        }
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
})

//============================================//
//ALL CALLS FROM NOW ON NEED TO BE AUTHORIZED
//============================================//

router.use(require('./api/auth/auth'));
// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//-----------------------//
//  get details of user  //
//-----------------------//
router.get('/user/auth/:UserID', function(req, res) {
    console.log('/user/auth/'+params.UserID);
    var query = 'SELECT * from user WHERE UserID = \'' + req.params.UserID +'\'';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if(results != null)
             res.send(JSON.stringify({"response": results}));
        else{ 
            res.send(JSON.stringify({"response": null}));
        }
    });
}); 



router.post('/logout' , (req,res) => {
    const postData = req.body;
    console.log('/logout');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const user = {
        "username": postData.u,
        "token" : postData.token
    }
    // database authentication here, with username and token combination.
    var query = 'SELECT * from user WHERE UserID = \'' + user.username +'\' AND token = \'' + user.token +'\'';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('Affected rows:'+results.length);
        if(results.length === 1){
            
            updatedb("","",user.username);
            res.status(200).json({"token":"loggedout"})
         
        }else{ 
            console.log('END: /logout WITH ERROR');
            return  res.status(500).json({"token": null});
        }   
        
    });
  
})


router.get('/users', function(req, res) {
    var query = 'SELECT * from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});


router.get('/adduser', function(req, res, next) {
    var query = ' from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        res.send(JSON.stringify(results));
    });
});

router.get('/bids', function(req, res, next) {
    var query = 'SELECT * from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

router.get('/bid', function(req, res, next) {
    var query = 'SELECT * from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//-----------------
// START THE SERVER
//-----------------
const  port = process.env.PORT || 3030;
app.listen(port);

console.log('Magic happens on port: ' + port);
console.log('................................');
