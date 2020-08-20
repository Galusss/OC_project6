## OC_project6
### Formation Développeur Web OpenclassRooms (P6)

#### __Exercice :__ Construisez une API sécurisée pour une application d'avis gastronomiques.

#### __Compétences évaluées :__
 1. Implémenter un modèle logique de données conformément à la réglementation.
 2. Stocker des données de manière sécurisée.
 3. Mettre en œuvre des opérations CRUD de manière sécurisée.

##### __Fonctionnement & contraintes :__ 
 1. Framework : Express
 2. Serveur : NodeJS 
 3. Base de donnée : MongoDB
 4. Toute les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.
 5. L’API doit parfaitement fonctionner avec le frontend du projet, il ne doit pas y avoir de régressions côté front.
Les données des utilisateurs doivent impérativement être protégées, que ce soit côté API ou côté base de données grâce à des méthodes de masquage.

##### __Exigences concernant la sécurité :__ 
 1. L’API doit respecter les standards OWASP¨.
 2. L’API doit respecter le RGPD. 
 3. Le mot de passe des utilisateurs doit être chiffré.
 4. 2 types de droits administrateur à la base de données doivent être définis : un accès pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base de données.
 5. La sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine.
 6. L’authentification est renforcée sur les routes requises.
 7. Les mots de passe sont stockés de manière sécurisée.
 8. Les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique (le plugin rapportera également les erreurs de la base de données).
 
##### __Installation de l'API :__ 
1. Télécharger le backend du projet.  (https://github.com/Galusss/OC_project6)
2. Ajouter les variables d'environnement dans un nouveau fichier qu'il faut créer et nommer ".env" dans le dossier racine du backend. 
3. Lancer le backend du projet avec la commande suivante "nodemon server"

*Frontend de l'application :*
https://github.com/OpenClassrooms-Student-Center/dwj-projet6

