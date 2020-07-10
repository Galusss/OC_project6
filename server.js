const http = require('http'); // Import du package HTTP natif de Node, il sera utiliser pour créer un serveur

const server = http.createServer((req, res) => { // Fonction qui sera éxécuter a chaque appel du serveur , elle reçoit les objets request et response en tant qu'arguments
    res.end('Voilà la réponse du serveur !'); // Utilisation de la méthode "end" de la réponse pour renvoyer une réponse de type string à l'appelant
});

server.listen(process.env.PORT || 3000); // Le serveur écoute la variable d'environnement du port si la plateforme de déploiement utilise un port par déffaut OU il écoute le port 3000