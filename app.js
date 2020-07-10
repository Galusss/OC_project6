const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const Sauce = require('../models/sauce.js'); // Importe le schéma des données de sauce
// const User = require ('./models/user.js'); // Importe le schéma des données de user

const sauceRoutes = require('./routes/sauces'); // Importe le routeur sauceRoutes

mongoose.connect('mongodb+srv://superadmin:456.password@apibdd.nkz4u.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => { // Création d'un middleware qui permet d'acceder a l'API depuis n'importe quelle origine, ajouter les header, envoyer des requête avec les methode mentionnées ; cela évitera les erreurs CORS "Cross Origin Ressource Sharing"
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/sauces', sauceRoutes) // Toute les demandes effectuer vers /api/sauces seront rediriger vers le routeur sauceRoutes







app.use((req, res, next) => { 
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Serveur OK !' });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
});



module.exports = app;