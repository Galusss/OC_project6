const express = require('express');
const router = express.Router(); // Fonction permettant de créer un nouveau routeur

const userCtrl = require('../controllers/user'); // Ce routeur redirigera sur le contrôler userCtrl

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
