require('dotenv').config()
const jwt  = require("jsonwebtoken");


module.exports = function superAdmin(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try{
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        if(decoded.role === 'super_admin'){
            next();
        }
        else{
            return res.status(403).send('Access denied')
        }
    }
    catch (ex) {
        res.status(400).send('Invalid token.')
    }
}

