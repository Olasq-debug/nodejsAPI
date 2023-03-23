const bcrypt = require('bcrypt')
const Users = require('../model/Users')


const registerHandler = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(409).json({"message": "Username and password is required"});

    //check if user already exists
    const existingUser = await Users.findOne( {username: username}).exec();
    if(existingUser) return res.status(401).json({"message": "Username already exists"});

    try {
        //encrypt password
        const hashpwd = await bcrypt.hash(password, 10);
        const newUser = { 
            "username": username, 
            "password": hashpwd 
        };

        const result = Users(newUser);
        await result.save()
        console.log(result)
        res.status(201).json({"success": `${username} successfully registered`})

    } catch (err) {
        console.log(err.stack)
        res.sendStatus(500)
    }

};

module.exports = { registerHandler }