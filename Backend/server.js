//----------------------//
//   S E R V E R . j s  // 
//----------------------//

// Libraries

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.cert', 'utf8');

var credentials = {key: privateKey, cert: certificate};

const express = require('express');
const app = express();

// express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const updatedb = require('./api/auth/updatedb.js')
const updatedb_approval = require('./api/auth/updatedb_approval.js')
const user_exists = require('./api/auth/user_exists.js')
const bid_exists = require('./api/auth/bid_exists.js')

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
    
    // database authentication here, with username and password combination.
    var query = 'SELECT * from user WHERE UserID = \'' + user.username +'\' AND Password = \'' + user.password +'\'';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        var ip = req.connection.remoteAddress;

        console.log('[User found:'+results.length +'] IP:'+ip);
        if(results.length === 1){
            
            var type= null;
            if(results[0].UserTYPE==='1') {type ="1"; console.log('Hello admin');}
            if(results[0].UserTYPE==='0') type = "0";
            if(results[0].UserTYPE===null) type = null;
           
             wrong = false; //wrong password = false 
             //var today = new Date();

             const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
             const refreshToken = jwt.sign(user, config.refreshTokenSecret+Date.now(), { expiresIn: config.refreshTokenLife})
             const response = {
                 "status": "Logged in",
                 "token": token,
                 "refreshToken": refreshToken,
                 "username": postData.u,
                 "type": type
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

router.get('/items', function(req, res) {
    console.log('>> /items/');
    var query = 'SELECT * from item WHERE Sold = \'' + 'No'+'\'';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if(results != null){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
             res.send(JSON.stringify({results}));
        }
        else{ 
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(JSON.stringify({"response": "0"}));
        }
    });
}); 

router.get('/admin/allitems', function(req, res) {
    console.log('>> /admin/allitems/');
    var query = 'SELECT * from item ';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if(results != null){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
             res.send(JSON.stringify({results}));
        }
        else{ 
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(JSON.stringify({"response": "0"}));
        }
    });
}); 
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
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/register', function(req, res, next) {
    var postData = req.body;
    const user = {
         username: postData.username,
         password: postData.password ,
         fname:    postData.fname  ,
         lname:    postData.lname    ,
         email:    postData.email    ,
         phone:    postData.phone    ,
         address:  postData.address  ,
         location: postData.location ,
         vat:      postData.vat      
    }
   var exists = false;
   //check if user exists

    exists = user_exists(user.username);
    
    if(exists === false){
   //Insert new user
    var query = 'INSERT INTO user (UserID, token, rtoken, UserTYPE, Password, First_Name, Last_Name, Email, Phone, Address, Location, Seller_Rating, Bidder_Rating, GPS, VAT, Approved) VALUES(\''+user.username+'\',\''+ null +'\',\''+ null +'\',\''+ "0" +'\',\''+user.password+'\',\''+user.fname+'\',\''+user.lname+'\',\''+user.email+'\',\''+user.phone+'\',\''+user.address+'\',\''+user.location+'\',\''+ null +'\',\''+ null +'\',\''+ null +'\',\''+user.vat+'\',\''+'0'+'\''+')';
    console.log(query);
    global.connection.query(query, function (error, results, fields) {
        if (error) {console.log('AAAAAAAAAAAAAAAAAAAA') ; throw error;}
        done=true;
        res.send(JSON.stringify({"response": "success"}));
    });
    }else{
        return res.status(200).json({"response":"exists"})
    }
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
    console.log('>> /user/auth/'+req.params.UserID);
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
        if(results.length === 1){
            updatedb("","",user.username);
            return res.status(200).json({"token":"loggedout"})
        }else{ 
            console.log('USER NOT FOUND: /logout WITH ERROR');
            return  res.status(500).json({"token": null});
        }   
    });
})

//return all online users
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


//return all requested users for approval
router.get('/admin/pending', function(req, res) {
    console.log('>> /admin/pending')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    var query = 'SELECT UserID from user WHERE Approved = \'No\';';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});


//approve all users 
router.get('/admin/approveall', function(req, res, next) {
    var query = 'UPDATE user SET Approved = "Yes"';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});

router.post('/admin/delete', function(req, res, next) {
    var postData = req.body;
    var query = 'DELETE FROM user WHERE ItemID =\''+postData.ItemID+'\';';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});

//approve specific user
router.get('/admin/approve', function(req, res, next) {
    var postData = req.body;
    var query = 'UPDATE user SET Approved = "Yes" WHERE UserID =\''+postData.UserID+'\';';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});
//-----//
//ITEMS//
//-----//

router.post('/additem', function(req, res, next) {
    var postData = req.body;
    var query = 'INSERT INTO  item  (Name, Category, Location, Country, Started, Sold, Buy_Price, Seller_ID, Ends) VALUES ( \''+ postData.name+'\',\''+postData.Category+'\',\''+ postData.Location+'\',\'' + postData.Country +'\',\''+ Date.now() +'\',\'No\',\''+postData.Buy_Price+'\',\''+postData.UserID+'\',\''+postData.Ends+'\');';
    console.log(query);
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});


router.post('/itemedit', function(req, res, next) {
    var postData = req.body;
    var query = 'UPDATE item SET Name = \'' + postData.Name+'\', Category = \''+postData.category+'\' Location =\''+ postData.location+'\' Country = \'' + postData.Country +'\' WHERE ItemID =\''+postData.ItemID+'\';';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});

router.post('/deleteitem', function(req, res, next) {
    var postData = req.body;
    var query = 'DELETE FROM item WHERE ItemID =\''+postData.ItemID+'\';';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});

router.post('/myitems', function(req, res, next) {
    var postData = req.body;
    var query = 'SELECT * FROM item WHERE Seller_ID =\''+postData.UserID+'\';';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({results})
    });
});

//----//
//BIDS//
//----//

//return all bids 
router.get('/admin/allbids', function(req, res, next) {
    var query = 'SELECT * from bid';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});

//return all bids of a user
router.post('/bidsuser', function(req, res, next) {
    var query = 'SELECT * from bid WHERE Bidder_ID = \''+ req.body.UserID +'\'';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});

//return all bids of a itemid
router.post('/bidsitem', function(req, res, next) {
    var query = 'SELECT * from bid WHERE ItemID = \''+ req.body.ItemID +'\'';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});

//add bid and update item
router.post('/addbid', function(req, res, next) {
    var postData = req.body;
    console.log(postData)
    if(bid_exists(postData.UserID, postData.ItemID)!==false){
            return res.status(200).json({'results': 'error'})
    }else{
    var query = 'INSERT INTO bid (Bidder_ID, Time, Amount, ItemID) VALUES(\''+postData.UserID+'\',\''+ Date.now+'\',\''+postData.Bid+'\',\''+postData.ItemID+'\')';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({results})
    });
    }
});

//--------
//SEARCHES
//--------
router.post('/search', function(req, res, next) {
    var Search = req.body.search;
    var query = 'SELECT * from item WHERE name LIKE \''+ Search +'\'';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
});

router.post('/categorysearch', function(req, res, next) {
    var Search = req.body.category;
    var query = 'SELECT * from item WHERE Sold = "No" AND Category =\''+ Search +'\';';
    global.connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({"response":results})
    });
    
});

//-----------------
// START THE SERVER
//-----------------
const  port = process.env.PORT || 3030;
httpServer.listen(port);
//httpsServer.listen(port);

console.log('Magic happens on port: ' + port);
console.log('................................');
