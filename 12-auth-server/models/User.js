// importing mongoose Schema
const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


//exporting schema throw a mongoose model
// Mongoose will name our database as plural by default 'User' -> 'Users'
module.exports = model('User', UserSchema);