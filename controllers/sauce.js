const Sauce = require('../models/Sauce'); // Importe le modèle des Sauces
const fs = require('fs'); // Importe le package fs (file système) de node pour avoir accès au système des fichiers et pour pouvoir donc supprimer des images qui sont stockés

exports.getAllSauce = (req, res, next) => {
    Sauce.find().then( // Utilisation de la méthode find afin de renvoyer un tableau contenant toute les sauces de la base de données
        (sauces) => { // En cas de réussite (code 200) toute les sauces apparaitrons
            res.status(200).json(sauces);
        }
    ).catch( // Sinon (code 400 ou erreur Mongoose) : le message d'erreur sera envoyé
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); // Les données de requêtes sont envoyer sous forme form-data et non sous forme de JSON
    delete sauceObject._id; // Supprime le faux _id envoyé par le front-end
    const sauce = new Sauce({
        ...sauceObject, // L'opérateur spread (...) est utilisé pour faire une copie de tout les éléments de req.body 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Résoud l'URL complète de l'image car req.file.filename ne contient que le segment filename. Il faut utiliser req.protocol pour obtenir le premier segment , puis après '://' il faut utiliser req.get('host') pour résoudre l'hôte du serveur , et enfin il faudra ajouter '/images/' et le nom de fichier pour compléter l'URL
    });
    sauce.save() // La méthode save permet d'enregistré la sauce dans la base de données, la méthode contient une promise ainsi dans le bloc then nous renvoyons un message de réussite en cas de code 201 et un message erreur en cas de code 400 ou une erreur généré par Mongoose
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ // Utilisation de la méthode findOne pour trouver la Sauce ayant le même _id que le paramètre de la requête
        _id: req.params.id
    }).then(
        (sauce) => { // La sauce est ensuite retourné dans une Promise est envoyé au front-end
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => { // Si il y'a une erreur elle sera généré puis retourné au front-end également
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? // Créer un objet qui regarde si req.file existe ou non. Si il existe on traite la nouvelle image sinon on traite simplement l'objet entrant
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Résoud l'URL complète de l'image car req.file.filename ne contient que le segment filename. Il faut utiliser req.protocol pour obtenir le premier segment , puis après '://' il faut utiliser req.get('host') pour résoudre l'hôte du serveur , et enfin il faudra ajouter '/images/' et le nom de fichier pour compléter l'URL
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // On créer une instance Sauce a partir de l'objet créer précédemment puis on implante la méthode updateOne qui permet de mettre à jour la Sauce qui correspond à l'objet que nous passons comme premier argument donc l'id
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error })); // Si il y'a une erreur elle sera généré puis retourné au front-end
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // Utilise l'ID que l'on reçois comme paramètre pour accéder a la Sauce correspondante dans la base de données
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]; // Séparation de l'URL de notre images avec le "/images/"
            fs.unlink(`images/${filename}`, () => { // Supprime l'image enregistré dans le dossier images grâce au module fs 'files system'
                Sauce.deleteOne({ _id: req.params.id }) // La méthode deleteOne récupère l'objet correspondant au document à supprimer et renvoie ensuite une réponse de réussite ou d'échec au front-end
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    if (req.body.like === 1) { // Si l'utilisateur Like la sauce
        Sauce.findOne({
            _id: req.params.id
        }).then(
            (sauceLiked) => {
                Sauce.updateOne(
                    {_id: req.params.id},
                    {
                        $push: { usersLiked: req.body.userId },
                        $inc: { likes: 1 },
                    }
                )
                .then(() => res.status(200).json({ message: 'Like ajouté !' }))
                .catch((error) => res.status(400).json({ error }))
            }
        )
    } else if (req.body.like === -1) { // Sinon si l'utilisateur Dislike la sauce
        Sauce.findOne({ 
            _id: req.params.id
        }).then(
            (sauce) => { 
                Sauce.updateOne(   
                    { _id: req.params.id },      
                    {
                        $push: { usersDisliked: req.body.userId },
                        $inc: { dislikes: 1 },
                    } 
                )
                .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
                .catch((error) => res.status(400).json({ error }))
            }
        )
    } else if (req.body.like === 0) { // Sinon si l'utilisateur veux annuler son Like ou son Dislike
        Sauce.findOne({
            _id: req.params.id,
            usersLiked: req.body.userId
        }).then(
            (like) => {
                if (like) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 },
                        }
                    )
                    .then(() => { res.status(200).json({ message: 'Like  retiré !' }) })
                    .catch(error => res.status(400).json({ error }));
                }
            }
        )
        Sauce.findOne({
            _id: req.params.id,
            usersDisliked: req.body.userId
        }).then(
            (dislike) => {
                if (dislike) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 },
                        }
                    )
                    .then(() => { res.status(200).json({ message: 'Dislike retiré !' }) })
                    .catch(error => res.status(400).json({ error }));
                }
            }
        )
    }
}
