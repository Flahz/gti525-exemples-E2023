var http = require("http");
if (! http) process.exit(1);

var fs = require("fs");
if (! fs) process.exit(2);

var path="cours9-nodejs/";

var imagesPath = "images/";
var images = ["one.jpg", "two.jpg", "three.jpg", "four.jpg", "five.jpg"];

const express = require('express');
const app = express();
const port = 8090;

app.get('/',(req,res) => res.send("Hello world!"));

app.listen(port,()=>console.log('App listensing at http://localhost:8090'));

app.get('/ajax',(req,res)=>{
    
        console.log("Reçu: " + req.url);
        const count = Math.floor(Math.random() * 30) + 1; // +1 pour avoir entre 1 et 30
        const obj = {}; // Utiliser un objet
        for (var i = 0; i < count; i++) {
            const key = Math.floor(Math.random() * 30); // Inclus entre 0 et 29
            const value = images[Math.floor(Math.random() * images.length)];
            obj[key] = "images/" + value;
        }
        console.log(obj);
        res.writeHead(200, { 
            "Content-Type": "application/json",  // Indiquer que la réponse est en JSON
            "Access-Control-Allow-Origin": "*"  // Autoriser CORS pour les tests locaux
        });
        res.end(JSON.stringify(obj));

    
});
app.get(/^\/(?!ajax).*$/, (request, response) => {
    if(request.url.endsWith(".html") || request.url.endsWith(".js") || request.url.endsWith(".png") || request.url.endsWith(".jpg")){
            var fileName = path + request.url;
            var rs = fs.createReadStream(fileName);
            console.log("Lecture du fichier: " + fileName);
            rs.on("error", function(error) {
                console.log(error);
                response.write("Impossible de lire: " + fileName);
                response.statusCode = 404;
                response.end();
            });
            rs.on("data", function(data) {
                response.write(data);
            });
            rs.on("end", function() {
                response.end();
            });
        }
        else{
            response.write("Requête inconnue: " + request.url);
            response.statusCode = 404;
            response.end();
        }
});
