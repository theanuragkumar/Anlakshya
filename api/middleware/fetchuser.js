const jwt = require('jsonwebtoken');

const JWT_SECRET= process.env.JWT_SECRET;

const fetchuser = (req, res, next)=>{

// Get the user from the jwt token and add id to req object

    const token=req.header('auth-token');
    if(!token){
        res.status(404).send({error: "Auth Token Not Found"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next(); 
    } catch (error) {
        res.status(401).send({error: "Please authenticate with valid token"});
    }

}


module.exports= fetchuser;