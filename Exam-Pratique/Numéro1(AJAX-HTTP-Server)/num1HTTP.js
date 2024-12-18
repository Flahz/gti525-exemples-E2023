const { XMLHttpRequest } = require('xmlhttprequest');

function printGTIPosts() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://www.reddit.com/r/etsmtl.json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            const contentType = xhr.getResponseHeader("Content-Type");
            if (contentType && contentType.includes("application/json")) { 
                try {
                    var result = JSON.parse(xhr.responseText);
                    //console.log(result);
                    const posts = parseRedditData(result);
                    //Sconsole.log(posts);
                } catch (error) {
                    console.log("Error parsing JSON:", error);
                }
            } else {
                console.log("Invalid content type:", contentType);
            }
        } else {
            console.log("Invalid response code:", xhr.status);
        }
    };

    xhr.ontimeout = function () {
        console.log("Timed out");
    };

    xhr.onerror = function () {
        console.log("Resulted in an error!");
    };

    xhr.onabort = function () {
        console.log("Aborted");
    };

    xhr.send();
}
function parseRedditData(json) {
    const posts = {}
    const children = json.data.children;
    let counter = 0;
    for (const child of children) {
        const postData = {};
        postData["title"] = child.data.title;
        postData["author"] = child.data["author"];
        postData["sigle"] = child.data["author_flair_text"];
        posts[counter] = postData;
        counter++;
        if(postData["sigle"] == "MEC"){
            console.log(postData["author"]+", "+postData["title"]);
        }
    }
    
    return posts;
}
printGTIPosts();