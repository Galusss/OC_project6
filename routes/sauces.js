// Contiendra la logique de nos sauces...
const express = require('express');
const router = express.Router();

/* EXEMPLE D'UN ROUTEUR

const sauceCtrl = require('../controllers/sauce') // ON VA RECUPERER LA LOGIQUE METIER DE CHAQUE ROUTE QUI CE TROUVE DANS NOTRE CONTROLLEUR

router.get('/', stuffCtrl.getAllStuff);
router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);
*/

module.exports = router;