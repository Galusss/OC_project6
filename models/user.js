const mongoose = require('mongoose'); // Importe mongoose qui fait le liens avec notre API et notre BDD
const uniqueValidator = require('mongoose-unique-validator'); // Importe mongoose-unique-validator pour pré-valider les infos avant de les enregistrer

const userSchema = mongoose.Schema({
    userId: { type: String },
    email: { type: String, unique: true }, // unique: true = Il n'est possible de créer que 1 seul compte avec une même adresse mail
    password: { type: String },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
