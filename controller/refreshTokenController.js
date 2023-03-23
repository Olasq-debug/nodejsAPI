const jwt = require('jsonwebtoken');
const Users = require('../model/Users')

const refreshTokenHandler = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(404)
    .json({success: false,
        message: "cookies not provided!"});
    
    const refreshToken = cookies.jwt;
    try {
        //Check the user with the token
        const User = await Users.findOne({refreshToken: refreshToken}).exec();
        if(!User) return res.status(401)
        .json({success: false,
        message: "The user is unauthorized"});

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY,
            (err, decoded) => {
                if (err || User.username !== decoded.username) return res.status(401).json({success: false, message: "unauthorized token"});
                const accessToken = jwt.sign(
                    {"username" : decoded.username },
                    process.env.ACCESS_TOKEN_SECRET_KEY,
                    { expiresIn: '40s'}
                );
                res.status(200).json({ accessToken});
            }
        )

    } catch (err) {
        console.log(err.stack);
        res.sendStatus(500);
    }
}

module.exports = { refreshTokenHandler }