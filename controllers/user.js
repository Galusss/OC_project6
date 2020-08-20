const bcrypt = require('bcrypt'); // Le package bcrypt est utiliser pour chiffré le mot de passe
const jwt = require('jsonwebtoken') // Le package jsonwebtoken est utiliser pour créer et vérifier les tokens d'authentification
const MaskData = require('maskdata'); // Le package maskdata est utiliser pour masquer certaines données comme les adresses email
require('dotenv').config() // Permet de faire la liaison avec les variables d'environnement

const User = require('../models/User'); // Import du models User

exports.signup = (req, res, next) => {
  const maskedEmail = MaskData.maskEmail2(req.body.email); // Masquage de l'adresse email avec la configuration par déffault de maskdata
  bcrypt.hash(req.body.password, 10) // Appel de la function de haschage de bcrypt dans le password et on demande de "saler" le password 10x. Plus la valeur est élevé et plus la function sera longue mais le password sécurisé.
    .then(hash => { // Function qui sera asynchrone et qui renvoie une Promise dans laquelle nous recevons le hash généré
      const user = new User({ // On créer un utilisateur
        email: maskedEmail,
        password: hash
      });
      user.save() // On enregistre l'utilisateur dans la base de donnée en envoyant une réponse de réussite en cas de succès, et des erreur en cas d'échec
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  const maskedEmail = MaskData.maskEmail2(req.body.email); // Récupération de l'adresse email masqué par maskdata
  User.findOne({ email: maskedEmail }) // On utilise le modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur ne correspond pas a un utilisateur existant 
    .then(user => {
      if (!user) { // Si l'email ne correspond pas on renvoie une erreur '401 Unauthorized'
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      } // Si l'email correspond alors on continue
      bcrypt.compare(req.body.password, user.password) // Appel de la function compare de bcrypt pour comparer le password entré par l'utilisateur avec le hash enregistré
        .then(valid => {
          if (!valid) { // Si les password ne correspondent pas on renvoie une erreur '401 Unauthorized'
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          } // Si le password correspond on renvoie une réponse 200 contenant l'ID utilisateur et un token.
          res.status(200).json({
            userId: user._id,
            token: jwt.sign( // Appel de la function sign de jsonwebtoken pour encoder un nouveau token
              { userId: user._id }, // ID de l'utilisateur en tant que payload (les données encodées dans le token)
              process.env.KEY_TOKEN_AUTH, // On utilise une chaîne secrète stocké dans une variable d'environnement
              { expiresIn: '24h' } // On définis la durée de validité du token à 24h ; l'utilisateur doit donc se reconnecter au bout de 24h
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
