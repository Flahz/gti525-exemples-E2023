import { EventEmitter } from "events";
import WeatherWatcher from './WeatherWatcher.mjs'

// Cities
const cities = [
    {name: "Montreal", latitude: "45.50589", longitude: "-73.63486", interval: 1000},
    {name: "Quebec", latitude: "46.8123", longitude: "-71.2145", interval: 1800},
    {name: "Toronto", latitude: "43.7001", longitude: "-79.4163", interval: 2200},
]

function printWeather(cityName, currentWeather) {
    console.log(`${cityName}
\tTempérature: ${currentWeather.temperature}
\tVitesse des vents: ${currentWeather.windspeed}
\tDirection des vents: ${currentWeather.winddirection}`);
}

// Créer un nouvel EventEmitter
const emitter = new EventEmitter()

// Surveiller la météo aux villes demandées
const watcher = new WeatherWatcher(emitter, cities)
watcher.start()

setTimeout( () => watcher.stop(), 20000)

/*
  TODO: consommer l'ensemble des événements produits concernant les différentes
  villes dans le flux d'événements. Imprimer les données météorologiques
  (invoquez printWeather).
*/
cities.forEach( (city) => {
  emitter.on(city.name, (data) => {
      printWeather(city.name, data)
  })
})
