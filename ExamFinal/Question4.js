Promise.most = function(proms) {
    return new Promise((resolve, reject) => {
        let countResolue = 0;
        let countReject = 0;
        if (proms.length === 0) {
            resolve("Aucune promesse fournie.");
            return;
        }
        Promise.allSettled(proms).then((results) => {
            for (let result of results) {
                if (result.status === "fulfilled") {
                    countResolue++;
                } else if (result.status === "rejected") {
                    countReject++;
                }
            }

            const totalCount = countResolue + countReject;

            if (countResolue / totalCount >= 0.50) {
                resolve("Plus de 50% des promesses sont résolues.");
            } else {
                reject("Plus de 50% des promesses sont rejetées.");
            }
        });
    });
}

// Exemple d'invocation #1:
var prom1 = Promise.resolve();
var prom2 = Promise.reject();
var prom3 = Promise.reject();
var proms = [prom1, prom2, prom3];
Promise.most(proms).then( function(result) {
    console.log("La majorité des promesses ont été résolues");
}).catch( function(err) {
    // Cette ligne sera exécutée
    console.log("La majorité des promesses ont été rejetées");
});

// Exemple d'invocation #2:
var prom4 = Promise.resolve();
var prom5 = Promise.reject();
var prom6 = Promise.reject();
var prom7 = Promise.resolve();
var proms = [prom4, prom5, prom6, prom7];
Promise.most(proms).then( function(result) {
    // Cette ligne sera exécutée
    console.log("La majorité des promesses ont été résolues");
}).catch( function(err) {
    console.log("La majorité des promesses ont été rejetées");
});