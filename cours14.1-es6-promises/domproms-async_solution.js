// Override the incomplete functions in domproms.js
// (load this script after domproms.js)

// Gestion de chaque bouton cliqué:
// Changer la couleur du bouton lorsque cliqué en
// invoquant la méthode "color" sur le bouton qui a été appuyé
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
async function waitForButtons(proms) {

    const ordered = (getParameterByName("checked") == "true")
    console.log(ordered)

    if (ordered) {

        // TODO: l'ordre de cochage est important (il faut cocher tous
        // les éléments dans l'ordre)

        // Simplement attendre chaque promesse séquentiellement
        // Note: proms.forEach ne peut pas être utilisé ici!
        for (let i=0; i<proms.length; i++) {
            const button = await proms[i]
            button.color()
            // ou: (await proms[i]).color()
        }            
        
    } else {

        // TODO: l'ordre de cochage n'a pas d'importance

        // Deux options:
        // 1) avec forEach
        // Puisqu'une fonction (async) est invoquée pour chaque élément du tableau
        // la séquentialité sera assurée; pas besoin d'envelopper le await dans une
        // autre fonction async
        proms.forEach( async (prom) => {
            const button = await prom
            button.color();
        })

        // 2) itération tableau régulière
        // Il faut utiliser une fonction IIFE anonyme async qui attend la promesse
        for (let i=0; false || i<proms.length; i++) {   
            (async() => {
                const button = await prom
                button.color()
            })()
            // ou: (async() => (await prom).color())()
        }
    }
}

// Attendre que le premier bouton ne soit cliqué
// Invoquer la méthode firstClicked
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
async function waitForFirstButton(proms) {
    // Créer une fonction anonyme async pour chaque promesse, chaque
    // fonction va attendre la résolution de la promesse
    let asyncProms = proms.map( prom => (async() => await prom )() )
    // Attendre la complétion de la première promesse
    let button = await Promise.race( asyncProms )

    firstClicked(button)
}

// Attendre que tous les boutons aient été cliqués
// Invoquer la méthode allClicked
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
async function waitForAllButtons(proms) {
    // Créer une fonction anonyme async pour chaque promesse, chaque
    // fonction va attendre la résolution de la promesse
    let asyncProms = proms.map( prom => (async() => await prom )() )
    // Attendre la complétion de toutes les promesses
    await Promise.all( asyncProms )

    allClicked()
}
