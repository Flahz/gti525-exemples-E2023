// Serveur pour le client AJAX du cours sur AJAX

var http = require("http");
if (!http) process.exit(1);

var fs = require("fs");
if (!fs) process.exit(2);

var path = "";

var serveRequest = function (request, response) {
	if (request.url.startsWith("/search?query=")) {
		var expr = decodeURIComponent(request.url.split("=")[1]).replaceAll("+", " ");
		console.log(expr);
		response.statusCode = 200;
		response.write("<html><body>Aucun resultat trouve pour l'expression: " + expr + "</body></html>");
		response.end();
	} else if (request.url.startsWith("/getdiploma?address=")) {
		var expr = decodeURIComponent(request.url.split("=")[1]);
		console.log(expr);
		response.statusCode = 200;
		response.write("Merci d'avoir commande votre diplome! Ce dernier sera expedie a l'adresse suivante: " + expr);
		response.end();
	} else if (request.url.startsWith("/searchhistory")) {

		var history = [
			"Algebre lineaire",
			"Physique",
			"Informatique",
			"Sociologie"
		]

		response.writeHead(200, { "Content-Type": "application/json" });
		response.write(JSON.stringify(history));
		response.end();

	} else if (request.url.startsWith("/grades")) {

		var grades = {
			"GTI525": "D",
			"LOG210": "D",
			"LOG320": "D",
			"GTI700": "D",
			"LOG121": "D",
			"GTI611": "D",
		}

		response.writeHead(200, { "Content-Type": "application/json" });
		response.write(JSON.stringify(grades));
		response.end();

	} else if (request.url.startsWith("/personalinfo")) {

		var pinfo = {
			name: "Julien Gascon-Samson",
			pin: 12345,
			address: "1100 Notre-Dame Ouest",
			SIN: "123 456 789"
		};

		response.writeHead(200, { "Content-Type": "application/json" });
		response.write(JSON.stringify(pinfo));
		response.end();

	} else if (request.url.startsWith("/redets")) {
		if (request.method == "POST") {
			request.on("data", function (blob) {
				let comment = decodeURIComponent(blob.toString().replaceAll("+", " ")).replace("comment=", "")
				fs.appendFile('redets.txt', comment, function (err) {
					if (err) throw err;
					console.log("Added comment: " + comment);
				});
			});
			request.on("end", function () {
				// Append eol
				fs.appendFile('redets.txt', "\n", function (err) {
					if (err) throw err;
				});
			});
		}

		// Serve page with form
		response.statusCode = 200;
		var fileName = "redets.html";
		var rs = fs.createReadStream(fileName);
		console.log("Lecture du fichier: " + fileName);
		rs.on("error", function (error) {
			console.log(error);
			response.write("Impossible de lire: " + fileName);
			response.statusCode = 404;
			response.end();
		});
		rs.on("data", function (data) {
			//console.log( data.toString() )

			var rs2 = fs.createReadStream("redets.txt");
			console.log("Lecture du fichier: " + "redets.txt");
			rs2.on("error", function (error) {
				console.log(error);
				response.write("Impossible de lire: " + fileName);
				response.statusCode = 404;
				response.end();
			});
			rs2.on("data", function (data2) {

				response.write(data.toString().replace("%comments%", data2.toString()));
			});
			rs2.on("end", function () {
				response.write("")
				response.end();
			});
		});
	} else if (request.url.endsWith(".html") || request.url.endsWith(".js") || request.url.endsWith(".jpg") || request.url.endsWith(".png") || request.url == "/") {
		// Si c'est un fichier HTML, JS ou une image, récupérer et retourner le fichier demandé
		response.statusCode = 200;
		var fileName = (path + request.url).substr(1);
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
