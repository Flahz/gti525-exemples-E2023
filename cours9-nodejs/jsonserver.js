// Serveur pour le client JSON du cours sur AJAX

var http = require("http");
if (!http) process.exit(1);

var fs = require("fs");
if (!fs) process.exit(2);

var path = "static/";

var imagesPath = "images/";
var images = ["one.jpg", "two.jpg", "three.jpg", "four.jpg", "five.jpg"];

var serveRequest = function (request, response) {
	if (request.url.startsWith("/ajax")) {
		// Si c'est une requête AJAX, générer aléatoirement
		console.log("Reçu: " + request.url);

		var arr = {};
		for (int i = 0; i < 30 ; i++) {
			var key = Math.floor(Math.random() * 30);
			var rand = Math.floor(Math.random() * 5);
			var image = imagesPath + images[rand];
			arr[key] = image;
		}

		response.writeHead(200, { "Content-type": "application-json" });
		response.write(JSON.stringify(arr));
		response.end();
	} else if (request.url.endsWith(".html") || request.url.endsWith(".js") || request.url.endsWith(".jpg") || request.url.endsWith(".png")) {
		// Si c'est un fichier HTML, JS ou une image, récupérer et retourner le fichier demandé
		response.statusCode = 200;
		var fileName = path + request.url;
		var rs = fs.createReadStream(fileName);
		console.log("Lecture du fichier: " + fileName);
		rs.on("error", function (error) {
			console.log(error);
			response.write("Impossible de lire: " + fileName);
			response.statusCode = 404;
			response.end();
		});
		rs.on("data", function (data) {
			response.write(data);
		});
		rs.on("end", function () {
			response.end();
		});
	} else {
		response.write("Requête inconnue: " + request.url);
		response.statusCode = 404;
		response.end();
	}
};


// Démarre le serveur sur le port demandé et configure la réponse
var port = 8080;
var server = http.createServer(serveRequest);
server.listen(port);
console.log("Démarrage du serveur sur le port: " + port);
