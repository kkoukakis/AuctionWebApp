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
        console.log("(DB request/connection)");
    });

    next();
});


//------------------//
//ALL ROUTES FOR API//
//------------------//

var router = app; //express.js router

//---------//
//  login  //
//---------//

router.post('/login' , (req,res) => {
    const postData = req.body;
    console.log('>> /login ['+postData.u+']');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const user = { "username": postData.u , "password": postData.p}
    var wrong = true;
    var success = false;
    
    // database authentication here, with username and password combination.
    var query = 'SELECT * from user WHERE UserID = \'' + user.username +'\' AND Password = \'' + user.password +'\'';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        var ip = req.connection.remoteAddress;

        console.log('[User found:'+results.length +'] IP:'+ip);
        if(results.length === 1){
             wrong = false; //wrong password = false 
             var today = new Date();
             const token = jwt.sign(user, config.secret+today.getDay(), { expiresIn: config.tokenLife})
             const refreshToken = jwt.sign(user, config.refreshTokenSecret+Date.now(), { expiresIn: config.refreshTokenLife})
             const response = {
                 "status": "Logged in",
                 "token": token,
                 "refreshToken": refreshToken,
                 "username": postData.u
             }
             tokenList[refreshToken] = response
            //update token to db
            updatedb(token,refreshToken,user.username);
            //console.log(tokenList);
            return res.status(200).json(response);
        }else{ 
                console.log('error login: credentials ['+ !wrong + ']')
                if(wrong === true){
                    
                     return res.status(200).json({"token": "wrong"});
                   }
                else{
                    return  res.status(500).json({"token": null});
                }
        }   
    });
})

//---------//
//  token  //
//---------//
router.post('/token', (req,res) => {
    console.log('>> /token');
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
        updatedb(response.token, postData.refreshToken,user.username);
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
})

//--------------//
//REGISTER USER
//--------------//
router.post('/register', function(req, res, next) {
    var query = ' from user';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        res.send(JSON.stringify(results));
    });
});

//============================================//
//ALL CALLS FROM NOW ON NEED TO BE AUTHORIZED
//============================================//
router.use(require('./api/auth/auth'));
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//-----------------------//
//  get details of user  //
//-----------------------//
router.get('/user/auth/:UserID', function(req, res) {
    console.log('>> /user/auth/'+params.UserID);
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
    console.log('>> /logout');
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
        //console.log('[User found:'+results.length +']');
        if(results.length === 1){
            updatedb("","",user.username);
            return res.status(200).json({"token":"loggedout"})
        }else{ 
            console.log('USER NOT FOUND: /logout WITH ERROR');
            return  res.status(500).json({"token": null});
        }   
    });
})


router.get('/admin/online', function(req, res) {
    console.log('>> /admin/online')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var query = 'SELECT * from user WHERE LENGTH(token)>2;';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});

router.get('/admin/pending', function(req, res) {
    console.log('>> /admin/pending')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    var query = 'SELECT UserID from users WHERE Approved = \'false\';';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});



router.post('/admin/adduser', function(req, res, next) {
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
