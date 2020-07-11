const express = require('express');
const bodyParser = require('body-parser'); // Importe le package body-parser (utiliser pour les requête POST)
const mongoose = require('mongoose'); // Importe le package mongoose qui fait le liens entre notre APi et notre BDD

const userRoutes = require('./routes/user'); // Importe notre route user qui concernera les requête vers /api/auth

mongoose.connect('mongodb+srv://superadmin:456.password@apibdd.nkz4u.mongodb.net/<dbname>?retryWrites=true&w=majority', // Connexion avec la base de données
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

app.use('/api/auth', userRoutes); // Toute les demandes effectuer vers /api/auth seront rediriger vers le routeur userRoutes qui lui même redirigera vers le contrôleur userCtrl.function

module.exports = app;