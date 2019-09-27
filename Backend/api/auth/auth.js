const jwt = require('jsonwebtoken')
const config = require('../../auth-config.json')

module.exports = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  if (token) {
    // verifies secret and checks exp
    //var today = new Date();
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            console.log('(Unauthorized)')
            return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
        }
      req.decoded = decoded;
        const { exp } = decoded;
        
      if (Date.now() >= exp * 1000) {
        return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
      }
      console.log('(Authorized)')
      next();
    });
  } else {
    // if there is no token
    // return an error
    console.log('(No token)')
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}