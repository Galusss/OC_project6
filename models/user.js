const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongose.model('User', userSchema);