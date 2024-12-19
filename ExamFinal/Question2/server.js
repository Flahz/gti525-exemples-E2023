const hosts = {
  "MangaEts": "https://mangaets.bimweb.net",
  "BookEts": "https://bookets.bimweb.net",
  "BiblioEts": "https://biblioets.bimweb.net"
};
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

function handleErrors(response) {
  if (!response.ok) throw Error(response.status + ": " + response.statusText);
  return response;
}

//votre code
app.get('/manga/:mangaID/availabilities', (req, res) => {

  const promise = new Promise((resolve) => {
    var dict = {};
    for (var key of Object.keys(hosts)) {
      const mangaID = req.params.mangaID;

      const url = hosts[key] + "/books/" + mangaID;

      fetch(url)
        .then(handleErrors)
        .then(response => response.json())
        .then((data) => {
          console.log(data.book.qty);
          dict[url] = data.book.qty;

        })

    }
    resolve(dict);
  })
  res.send(promise);
})
app.post('/manga/:mangaID/availabilities/:codePermanant', (req, res) => {
  const mangaID = req.params.mangaID;
  fetch("/manga/"+mangaID+"/availabilities")
  .then((dict)=>{
    for(var key in Object.keys(dict)){
      const dataBorrow = fetch(key).then()
    }
  })

  res.status(201)
})
app.listen(8080, () => console.log(`Example app listening at http://localhost:${8080}`))


