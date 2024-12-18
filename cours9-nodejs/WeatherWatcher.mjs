/* Module WeatherWatcher: reçoit périodiquement la météo
   de différentes villes en utilisant le service de open-meteo,
   et émet des événements lorsque les prévisions sont reçues
*/
import { EventEmitter } from "events"
import fetch from 'node-fetch' // npm install node-fetch

// Fonction adaptée de: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function handleErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
}

function buildOpenMeteoURL(latitude, longitude) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
}

class WeatherWatcher {
    constructor(emitter, cities) {
        this.emitter = emitter
        this.cities = cities
        this.timerIds = []
    }
    start() {
        if (this.timerIds.length > 0)
            this.stop()
        
        this.cities.forEach( (city) => {

            /*
              TODO: démarrer des timers qui vont récupérer périodiquement la météo
              aux villes demandées via des requêtes 'fetch' (l'URL sera obtenu
              en invoquant buildOpenMeteoURL).
              Lorsque la météo est reçue, émettre un événement correspondant
              au nom de la ville; le message sera les conditions météo actuelles
              ('current_weather').
              Conseil: si votre fonction gestionnaire dans setInterval utilise
              les fonctions fléchées, vous n'avez pas besoin de sauvegarder le
              contexte (let that = this).
            */

            this.timerIds.push( setInterval( () => {

                // Lancer une requête 'fetch'
                const url = buildOpenMeteoURL(city.latitude, city.longitude)
                fetch(url)
	            .then( handleErrors )
	            .then( response => response.json() )
	            .then( data => {
                        // Générer l'événement
                        //console.log("DEBUG: " + JSON.stringify(data["current_weather"]))
                        this.emitter.emit(city.name, data["current_weather"])
                    });
                
            }, city.interval))
        })
    }
    stop() {
        this.timerIds.forEach( (timerId) => {
            clearInterval(timerId)
        })
        timerIds = []
    }
}

export default WeatherWatcher;
