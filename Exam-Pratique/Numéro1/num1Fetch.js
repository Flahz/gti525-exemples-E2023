async function printGTIPosts() {
    try {
        const response = await fetch("https://www.reddit.com/r/etsmtl.json");
        if (response.status == 200) {
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                parseRedditData(result);
            }
            else
                console.log("Autre format que json");
        }
        else
            console.log("Invalid code response");
    }
    catch (error) {
        console.log(error);
    }
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
        if (postData["sigle"] == "MEC") {
            console.log(postData["author"] + ", " + postData["title"]);
        }
    }

    return posts;
}
printGTIPosts();