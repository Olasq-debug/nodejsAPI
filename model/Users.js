const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 5000
            
        },
        Admin: Number,
        Editor: Number
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: String
});

module.exports = mongoose.model('Users', userSchema)