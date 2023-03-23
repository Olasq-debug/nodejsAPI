const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../model/Users');


const loginHandler = async (req, res) => {

    const { username, password } = req.body;
    if(!username || !password) return res.status(403).json({"message": "Username and password are required"});
    
    const foundUser = await Users.findOne({username: username }).exec();
    if(!foundUser) return res.status(401).json({"message": "You need to register"});

    try{
        // compare password
        const match = await bcrypt.compare(password, foundUser.password);
        if(match){
        // create Jwts
        const accessToken = jwt.sign(
            {"username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: '50s'}
        );
        
        const refreshToken = jwt.sign(
            {"username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: '1d'}
        );
        // save user and refreshToken in db
        foundUser.refreshToken = refreshToken;
        await foundUser.save()

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        res.status(200).json({accessToken});
        
        }
        else { 
            res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({"message": "Internal error occured"});
    }

}

module.exports = { loginHandler }