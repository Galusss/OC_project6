const mongoose = require('mongoose'); // Import de mongoose qui fait le liens avec notre API et notre BDD

const sauceSchema = mongoose.Schema({
    userId: { type: String },
    name: { type: String, unique: true },
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String },
    imageUrl: { type: String },
    heat: { type: Number },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: [ String ],
    usersDisliked: [ String ],
});

module.exports = mongoose.model('Sauce', sauceSchema);
