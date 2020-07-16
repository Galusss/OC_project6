const express = require('express');
const router = express.Router(); // Création d'un router avec Express

const auth = require('../middleware/auth'); // Importe notre middleware "auth" qui protegera les routes relatives à la sauces
const multer = require('../middleware/multer-config'); // Importe le middleware "multer" qui permet d'enregistré les images ajoutés par les utilisateurs

const sauceCtrl = require('../controllers/sauce'); // Importe le controller sauce qui implémente la logique métier des routes

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);


module.exports = router;
