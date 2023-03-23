const { sendStatus } = require("express/lib/response")

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(req?.roles) return sendStatus(401);
        const arrayRoles = [...allowedRoles]
        const roles = req.roles
        const match = roles.map(role => arrayRoles.includes(role)).find(val => val == true);
        if(!match) res.sendStatus(403);
        next();
    }
    
}

module.exports = verifyRoles