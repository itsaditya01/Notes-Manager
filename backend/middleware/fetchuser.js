const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_STRING;

const fetchuser = (req, res, next) => {
    //checking token is valid or not
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : 'Please authenticate using valid token'})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error : 'Please authenticate using valid token'});
    }
}

module.exports = fetchuser;