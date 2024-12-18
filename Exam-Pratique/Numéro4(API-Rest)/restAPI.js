const express = require('express')
const app = express()
app.use(express.json());
const port = 3000
class Ville {
    constructor(name, count) {
        this.name = name
        this.count = count
    }
}
let villes = []
villes.getByName = function (name) {
    for (let i = 0; i < villes.length; i++) {
        if (villes[i].name == name)
            return villes[i]
    }
    return null
}
villes.getByCaseCount = function (countMin, countMax) {
    let results = []
    for (let i = 0; i < villes.length; i++) {
        if (villes[i].count >= countMin && villes[i].count <= countMax)
            return villes[i]
    }
    return results
}
villes.getPartial = function (offset, limit) {
    return villes.splice(parseInt(offset), parseInt(limit))
}
app.route('/villes/')
    .get((req, res) => {

        if ("offset" in req.query && "limit" in req.query) {
            res.json(villes.getPartial(req.query["offset"], req.query["limit"]));
        }
        else if ("countMax" in req.query && "countMin" in req.query) {
            res.json(getByCaseCount(req.query["countMax"], req.query["countMin"]));
        }
        else {
            res.json(villes);
        }
    })
    .post((req, res) => {
        const name = req.body.name;
        const count = req.body.count;
        const ville = new Ville(name, count);
        res.set("Content-Location", "/villes/" + ville.name)
        res.status(201)
        villes.push(ville);
        res.send(ville);

    })

app.route('/villes/:name')
    .delete((req, res) => {
        const name = req.params.name;
        const villeASupprimer = villes.getByName(name);
        villes.splice( villes.indexOf(villeASupprimer), 1 );
        res.json({});
        console.log("Delete ville, name=" + req.params["name"])
    })
    .get((res,req)=>{
        res.json(villes.getByName(req.params.name));
    })
    .put((req, res) => {
        let ville = villes.getByName(req.params.name)
        ville.name = req.body.name
        ville.count = req.body.count
        res.json(ville)
        })
        
    .patch((req,res)=>{
        let ville = villes.getByName(req.params.name);
        if(req.params.name){
            ville.name = req.params.name;
        }
        if(req.body.count){
            ville.count = req.body.count;
        }
        res.json(ville);
        console.log("Replace ville partially, name=" + req.params["name"])
    })
// TODO: implémentez votre code ici
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



// Pour exécuter localement: node app.js
// Si Express n'est pas installé, vous pouvez exécuter npm install express au préalable