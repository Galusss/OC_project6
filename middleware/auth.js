const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => { 
    try { // Tout est introduit a l'interieur d'un try/catch pour éviter les nombreux problèmes pouvant ce produire
        const token = req.headers.authorization.split(' ')[1]; // On extrait le token du header Authorization et on split pour récupérer tout après l'espace (uniquement le token sans "Bearer")
        const decodedToken = jwt.verify(token, process.env.KEY_TOKEN_AUTH); // On utilise la fonction verify pour décoder le token. Si il n'est pas valide une erreure sera générer
        const userId = decodedToken.userId; // On extrais l'ID utilisateur du token
        if (req.body.userId && req.body.userId !== userId) { // Si la demande conteint un ID utilisateur nous le comparons a celui extrait du token, si il sont différent cela génère une erreur
            throw 'Invalid user ID';
        } else {
            next(); // Si il ne sont pas différent notre utilisateur est authentifié et on passe a l'éxécution suivante a l'aide de la function next()
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
