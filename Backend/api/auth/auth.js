// export function isAuthenticated(req, res, next) {
//     if (typeof req.headers.authorization !== "undefined") {
//         // retrieve the authorization header and parse out the
//         // JWT using the split function
//         let token = req.headers.authorization.split(" ")[1];
//         let privateKey = fs.readFileSync('./private.pem', 'utf8');
//         // Here we validate that the JSON Web Token is valid and has been 
//         // created using the same private pass phrase
//         jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            
//             // if there has been an error...
//             if (err) {  
//                 // shut them out!
//                 res.status(500).json({ error: "Not Authorized" });
//                 throw new Error("Not Authorized");
//             }
//             // if the JWT is valid, allow them to hit
//             // the intended endpoint
//             return next();
//         });
//     } else {
//         // No authorization header exists on the incoming
//         // request, return not authorized and throw a new error 
//         res.status(500).json({ error: "Not Authorized" });
//         throw new Error("Not Authorized");
//     }
// }

const jwt = require('jsonwebtoken')
const config = require('../../config.json')

module.exports = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            console.log('Unauthorized')
            return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
        }
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    console.log('No token')
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}