const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    // verify jwt_accessToken
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        (err, decoded) => {
            if (err) return res.status(401).json({"message": "unauthorized"});
            req.username = decoded.username;
            req.roles = decoded.roles
            next();
        }
    )

}

module.exports =  verifyJWT 