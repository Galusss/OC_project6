const express = require('express');
const router = express.Router(); // Fonction permettant de créer un nouveau routeur

const userCtrl = require('../controllers/user'); //  Importe le controller sauce qui implémente la logique métier des routes

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
