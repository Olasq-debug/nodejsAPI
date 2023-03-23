const { clearCookie } = require('express/lib/response');
const Users = require('../model/Users')

const logoutHandler = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({message: "cookies not provided!"})
    res.clearCookie('jwt', {httpOnly: true}) // clear cookies
    const refreshToken = cookies.jwt;

    const foundUser = await Users.findOne({refreshToken: refreshToken}).exec();
    if(!foundUser) return res.sendStatus(401);
    res.clearCookie('jwt', {httpOnly:true})

    try {
        // delete cookies from db model
        foundUser.refreshToken = '';
        const sameUser = await foundUser.save();
        if(sameUser) return res.status(200).json({success: `${foundUser.username} is successfully logged out`})

    } catch (err) {
        console.log(err.stack)
        res.sendStatus(500);
    }

}

module.exports = { logoutHandler }