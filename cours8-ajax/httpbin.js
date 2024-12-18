fetch("https://httpbin.org/post", {method: "POST", body: "GTI525"})
    .then( handleErrors )
    .then( response => response.json() )
    .then( data => console.log( data.data) )
    .catch( error => console.log( "Une erreur est survenue: " + error ));