const mongoose = require('mongoose'); // Import de mongoose qui fait le liens avec notre API et notre BDD

const sauceSchema = mongoose.Schema({
    // ObjectId est directement généré par Mongoose, pas besoin de l'ajouter ici
    userId: { type: String },
    name: { type: String },
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String },
    imageUrl: { type: String },
    heat: { type: Number }, // Nombre compris entre 1 et 10 ; faut t'il le préciser ici ? 
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: String },
    usersDisliked: { type: String },
});

module.exports = mongoose.model('Sauce', sauceSchema);
