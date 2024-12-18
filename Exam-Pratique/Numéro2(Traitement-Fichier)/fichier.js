const { Console } = require('console');
var fs = require('fs');
if (!fs) process.exit(1);
if (process.argv.length < 3) {
    console.log("Syntax: fileName");
    process.exit(2);
}
// Premier paramètre passé en ligne de commande
var fileName = process.argv[2];
// Complétez votre code ici - ouvrez le fichier fileName
var readStream = fs.createReadStream(fileName, { encoding: 'utf8' });;
const dict = {};

readStream.on("data", function (chunk) {
    // Convertir le chunk en chaîne
    for (let i = 0; i < chunk.length; i++) {
        const char = chunk[i];
        if (dict[char]) {
            dict[char]++;
        } else {
            dict[char] = 1;
        }
    }
});

readStream.on("end", function () {
    let counterGrand = -1;
    let currentKey = null;
    if (Object.keys(dict).length === 0)
        console.log("Acun string trouvé")
    else {
        for (const key of Object.keys(dict)) {
            if (dict[key] > counterGrand) {
                counterGrand = dict[key]
                currentKey = key;
            }
        }
    }
    console.log(`Le caractère le plus fréquent est '${currentKey}' avec ${counterGrand} occurrences.`);
});

readStream.on("error", function () {
    console.log("Erreur lors de la lecture du fichier: " + fileName);
});

console.log("Fin du programme");


