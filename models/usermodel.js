const db = require('mongoose');
const schema = db.Schema;

const userSchema = new db.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = db.model('user', userSchema);

module.exports = userModel;