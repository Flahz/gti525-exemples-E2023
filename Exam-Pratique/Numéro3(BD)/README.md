Instructions on how to setup MongoDB in a docker container, import the data into MongoDB and how to use the shell.

1. Install and run MongoDB

To install MongoDB using Docker (all commands in sudo or root):

Note: the docker service needs to be running on Linux.
Restart the docker service if docker doesn't work, and check its status.
sudo systemctl restart docker
sudo systemctl status docker

First run (creating the container) -- pull the container first:
docker pull mongo
docker run --name mongodb -d mongo

Subsequent runs (container already created):
docker start mongodb

Check that mongodb works by opening mongosh in the container:
docker exec -it mongodb mongosh
(Ctrl+C to exit)

To install using other methods (e.g., DEB package, or local install/compile), please see the documentation online.

2. Importing the datasets (dataset.json and dataset_users.json)

Navigate to the path where the json files are.

A- MongoDB installed in a docker container (preferred method)

Note: if using docker (assuming container name is 'mongodb', as described above), you first need to copy these files into the docker container *in root* (sudo docker... or sudo su, then run all commands); e.g.:
docker cp dataset.json mongodb:/tmp/
docker cp dataset_users.json mongodb:/tmp/

Then import from /tmp/dataset.json or /tmp/dataset_users.json (here /tmp refers to the path *inside* the conainer)

docker exec -it mongodb mongoimport --db test --collection restaurants --file /tmp/dataset.json

docker exec -it mongodb mongoimport --db test --collection users --file /tmp/dataset_users.json

B- Mongodb installed locally directly on the system (e.g., DEB package)

Run mongoimport from a separate terminal in the same directory as the datasets as follows:

mongoimport --db test --collection restaurants --file ./dataset.json
mongoimport --db test --collection users --file ./dataset_users.json

3. Now start the mongo shell as follows in a terminal

docker exec -it mongodb mongosh
(with docker, in root)

mongosh
(without docker)

You should see the prompt. Inside the mongo shell type the following:

A. show dbs

You should see the test database listed

B. use test

You should see the message "switched to database test"

C. insert a restaurant as follows

db.restaurants.insert(
   {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : ISODate("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : ISODate("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }
)

You should see a message like "{nInserted : 1}"

D. List all the restaurants by typing

db.restaurants.find()

and type "it" to scroll the list

E. To find a particular restaurant type

db.restaurants.find( {"grades.score":{ $gt: 30 } } )

E. Remove all restaurants in the Manhattan borough

db.restaurants.find( {"borough":"Manhattan"} )
db.restaurants.remove( {"borough":"Manhattan"} )

should return WriteResult({ "nRemoved" : 10260 })

F. Update a particular record

db.restaurants.update( {"cuisine": "Pizza"}, { $set: {"cuisine" : "American(New)"} } )

You should see a message like

WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

G. To update all records type:

db.restaurants.update( {"cuisine": "Pizza"}, { $set: {"cuisine" : "American(New)"}}, {multi:true} )

you should see a message like 

WriteResult({ "nMatched" : 1647, "nUpserted" : 0, "nModified" : 1647 })

H. To perform a forEach operation

db.restaurants.find().forEach( function(Object) { if (Object.grades.length > 1) printjson(Object.grades) } )
db.restaurants.find().forEach( function(Object) { if (Object.name == "Tim Hortons") printjson(Object.grades) } )
db.restaurants.find().forEach( function(Object) { if (Object.name == "Mcdonald'S") printjson(Object.grades) } )




docker pull mongo
docker run --name mongodb -d -p 27017:27017 mongo
docker ps
docker cp C:\data\dataset.json mongodb:/tmp/
docker cp C:\data\dataset_users.json mongodb:/tmp/
docker exec -it mongodb mongoimport --db test --collection restaurants --file /tmp/dataset.json
docker exec -it mongodb mongoimport --db test --collection users --file /tmp/dataset_users.json

4. Connecter MongoDB Compass
Ouvrez MongoDB Compass.
Dans la connexion, entrez l'URI suivante :
mongodb://localhost:27017
Cliquez sur "Connect".
Vous devriez voir la base de données test avec les collections restaurants et users.
docker exec -it mongodb mongosh
show dbs
use test


db.restaurants.updateMany(
    {
        "borough": "Queens",
        "restaurant_id": { $gt: "42000000" },
        "cuisine": "Not Listed/Not Applicable"
    },
    {
        $set: { "cuisine": "Pizza" }
    }
)
db.restaurants.updateOne(
    { "borough": "Brooklyn", "cuisine": "Italian" },
    { $set: { "cuisine": "Mediterranean" } }
);
db.restaurants.insertMany([
    { "name": "Pasta Palace", "borough": "Brooklyn", "cuisine": "Italian" },
    { "name": "Sushi Spot", "borough": "Manhattan", "cuisine": "Japanese" },
    { "name": "Taco Town", "borough": "Queens", "cuisine": "Mexican" }
]);
db.restaurants.deleteMany(
    { "borough": "Bronx", "cuisine": "Fast Food" }
);
db.restaurants.deleteOne(
    { "name": "Pasta Palace" }
);
db.restaurants.updateMany(
    { "borough": "Manhattan" },
    { $inc: { "rating": 1 } }
);
db.restaurants.updateOne(
    { "name": "Sushi Spot" },
    { $push: { "reviews": { "user": "John", "comment": "Great sushi!" } } }
);
db.restaurants.updateOne(
    { "name": "Sushi Spot" },
    { $addToSet: { "tags": "Seafood" } }
);
db.restaurants.updateOne(
    { "name": "Sushi Spot" },
    { $pull: { "tags": "Seafood" } }
);
db.restaurants.updateMany(
    { "cuisine": "Japanese" },
    { $rename: { "rating": "score" } }
);
db.restaurants.find(
    { "borough": "Brooklyn" },
    { "name": 1, "cuisine": 1, "_id": 0 }
);
db.restaurants.replaceOne(
    { "name": "Taco Town" },
    { "name": "Taco Fiesta", "borough": "Queens", "cuisine": "Mexican", "rating": 4.5 }
);
db.restaurants.findOneAndUpdate(
    { "name": "Sushi Spot" },
    { $set: { "rating": 5 } },
    { returnDocument: "after" }
);
db.restaurants.findOneAndDelete(
    { "name": "Pasta Palace" }
);
db.restaurants.find(
    { "name": { $regex: /^Sushi/, $options: "i" } }
);
db.restaurants.aggregate([
    { $match: { "borough": "Manhattan" } },
    { $group: { "_id": "$cuisine", "count": { $sum: 1 } } },
    { $sort: { "count": -1 } }
]);
db.restaurants.updateOne(
    { "name": "Sushi Spot" },
    { $set: { "tags": ["Japanese", "Seafood"] } }
);
db.restaurants.updateOne(
    { "name": "New Restaurant" },
    { $setOnInsert: { "borough": "Manhattan", "cuisine": "Unknown" } },
    { upsert: true }
);
db.restaurants.find(
    { "address.zipcode": "10075" }
);
db.restaurants.updateMany(
    { "name": "Sushi Spot" },
    { $pull: { "reviews": { "rating": { $lt: 3 } } } }
);
db.restaurants.find(
    { "borough": "Queens" }
).sort({ "rating": -1 }).limit(5);
db.restaurants.countDocuments(
    { "cuisine": "Mexican" }
);