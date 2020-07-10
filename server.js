const http = require('http'); // Import du package HTTP natif de Node, il sera utiliser pour créer un serveur
const app = require('./app'); // Import de l'application express

const normalizePort = val => { // Renvoie un port valide, qu'il soit fourni sous forme d'un numéro ou d'une chaîne
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => { // Recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistré dans le serveur
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => { // Ecouteur d'évènements consignant le port ou le canal nommé sur lequel le serveur s'éxecute dans la console
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
