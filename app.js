const express = require('express');
const bodyParser = require('body-parser'); // Importe le package body-parser (utiliser pour les requête POST)

const path = require('path'); // Permet d'accéder au path, c'est grace a sa que l'on accedera au fichier 'images' peu importe l'URL

const userRoutes = require('./routes/user'); // Importe notre route user qui concernera les requête vers /api/auth
const sauceRoutes = require('./routes/sauce'); // Importe notre route sauce qui concernera les requête vers /api/sauces...

require('dotenv').config() // Permet de faire la liaison avec les variables d'environnement
const db = require('mongoose'); // Importe le package mongoose qui fait le liens entre notre APi et notre BDD
db.connect(`${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASS}@apibdd.nkz4u.mongodb.net/<dbname>?retryWrites=true&w=majority`, 
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

app.use('/images', express.static(path.join(__dirname, 'images'))); // Les images du dossier images chargeront peux importe l'URL ou nous nous trouvons

app.use('/api/auth', userRoutes); // Toute les demandes effectuer vers /api/auth seront rediriger vers le routeur userRoutes qui lui même redirigera vers le contrôleur userCtrl.function
app.use('/api/sauces', sauceRoutes); // Toute les demandes effectuer vers /api/sauces seront rediriger vers le routeur sauceRoutes qui lui même redirigera vers le contrôleur sauceCtrl.function


module.exports = app;
