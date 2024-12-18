1. Obtenir l'ensemble des villes disponibles (le nom de la collection REST à utiliser est villes)
2. Puisqu'il peut y avoir un très grand nombre de villes retournés par la fonctionnalité 1, vous devez prévoir un mécanisme permettant de gérer cette situation
3. Ajouter une nouvelle ville au système
4. Mettre à jour en une seule requête l'ensemble des données pour la ville de Montreal
5. Mettre à jour certaines données partielles pour la ville de Montreal.
6. Obtenir les données les plus récentes pour la ville de Montreal
7. Obtenir les données les plus récentes pour un sous-ensemble de villes en fonction du nombre de cas:      paramètres d'URL casmin=80 et casmax=120
8. Supprimer la ville de Montreal de la base de données

1. GET /villes - oui
2. GET /villes/?offset100&limit=20 - oui
3. POST /villes - non
4. PUT /villes/Montreal - non
5. PATCH /villes/Montreal - non 
6. GET /villes/Montreal - oui
7. GET /villes?casmin=80&casmax=120 - oui
8. DELETE /villes/Montreal - non

Méthodes idempotentes :

GET : Lire une ressource.
Si vous demandez une ressource plusieurs fois (GET /villes/1), cela n’a pas d’effet sur le système. Le résultat est le même à chaque fois.
PUT : Mettre à jour une ressource.
Si vous mettez une ressource à jour (PUT /villes/1 avec les mêmes données), l'état final est toujours identique.
DELETE : Supprimer une ressource.
Si vous supprimez une ressource plusieurs fois (DELETE /villes/1), l'effet est identique après la première suppression : la ressource n'existe plus.

Méthodes non idempotentes :

POST : Créer une ressource.
Si vous exécutez plusieurs fois une requête POST pour créer une ressource (POST /villes), chaque exécution crée une nouvelle ressource, modifiant l'état du système.