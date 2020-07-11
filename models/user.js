const mongoose = require('mongoose'); // Import de mongoose qui fait le liens avec notre API et notre BDD
const uniqueValidator = require('mongoose-unique-validator'); // Import de mongoose-unique-validator pour pré-valider les infos avant de les enregistrer

const userSchema = mongoose.Schema({
    userId: { type: String },
    email: { type: String, required: true, unique: true }, // unique: true = Il n'est possible de créer que 1 seul compte avec une même adresse mail
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);