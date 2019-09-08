//----------------------//
//     S E R V E R      // 
//----------------------//
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 

// parse application/json
app.use(bodyParser.JSON());


const  port = process.env.PORT || 3030;

app.listen(port);

console.log('REST API server started on: ' + port);


