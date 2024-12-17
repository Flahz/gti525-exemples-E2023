function AJAXRequest() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET","http://localhost:8090/ajax");
	xhr.addEventListener("load",()=>{
		if(xhr.status===200){
			if( xhr.getResponseHeader ("Content-Type") == "application/json"){
				var result = JSON.parse(xhr.responseText);
				swapImages(result);
			}
			else {
				console.log("Invalid content type");
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
	xhr.send();
}
function swapImages(data){
	const images = document.getElementsByTagName('IMG');
	for (const key of Object.keys(data)) { // Utiliser Object.keys pour les objets
        if (images[key]) {
            images[key].src = data[key]; // Mettre à jour l'image avec la nouvelle source
        }
    }
}
window.onload = function() {

    setInterval(function() { AJAXRequest(); }, 1000);
    
}
