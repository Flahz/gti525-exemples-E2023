const { XMLHttpRequest } = require('xmlhttprequest');

function showTopQuotedAnime() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://animets.bimweb.net/quotes");
    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {

            var result = JSON.parse(xhr.responseText);
            let dict = {};
            for(var quote of result.quotes){
                if(dict[quote.anime]){
                    dict[quote.anime]++;
                }
                else{
                    dict[quote.anime] = 1;
                }
            }
            const dictReturn = {};
            for(var key of Object.keys(dict)){
                if(dict[key] > 3 ){
                    dictReturn[key] = dict[key];
                }
            }
           

            console.log(dictReturn);
        }


        else {
            console.log("Invalid response code");
        }
    })
    xhr.ontimeout = function () {
        console.log("Timed out");
    }
    xhr.onerror = function () {
        console.log("Resulted in an error !");
    };
    xhr.onabort = function () {
        console.log("Aborted");
    };


    xhr.send();
}
function getAnimeByName(name){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://animets.bimweb.net/animes");
    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {

            var result = JSON.parse(xhr.responseText);
            for(var key of Object.keys(result)){
                if(result[key].name == name){
                    console.log("true");
                    return true;
                }
            }
            console.log("false");
            return false;
        }
        

        else {
            console.log("Invalid response code");
        }
    })
    xhr.ontimeout = function () {
        console.log("Timed out");
    }
    xhr.onerror = function () {
        console.log("Resulted in an error !");
    };
    xhr.onabort = function () {
        console.log("Aborted");
    };


    xhr.send();
}
function createAnimeQuote(anime, character, quote){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://animets.bimweb.net/quotes");
    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            if(getAnimeByName(anime)){
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send('anime='+anime+'&character='+character+'&quote='+quote);
            }
            else{
                console.log("Anime entré en paramètre n'existe pas dans la liste");
            }
        }


        else {
            console.log("Invalid response code");
        }
    })
    xhr.ontimeout = function () {
        console.log("Timed out");
    }
    xhr.onerror = function () {
        console.log("Resulted in an error !");
    };
    xhr.onabort = function () {
        console.log("Aborted");
    };


    xhr.send();
}
