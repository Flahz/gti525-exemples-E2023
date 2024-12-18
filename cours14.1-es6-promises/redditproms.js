class RedditPost {
    constructor(author, title, text, url, comments = []) {
        this.author = author
        this.title = title
        this.text = text
        this.url = url
        this.comments = comments
    }
}

// Invoquer cette fonction en passant l'objet JSON désérialisé retourné
// par l'API Reddit (sur un subreddit). Retourne un tableau d'objets RedditPost.
RedditPost.parsePosts = function (redditObject) {
    let posts = []

    let children = redditObject.data.children
    for (let p of children) {
        let post = p.data
        let url = "https://www.reddit.com" + post.permalink.slice(0, -1) + ".json"
        posts.push(new RedditPost(post.author, post.title, post.selftext, url))
    }

    return posts
}

// Invoquer cette fonction en passant l'objet JSON désérialisé retourné
// par l'API Reddit (sur un post). Retourne un objet RedditPost.
RedditPost.parsePost = function (redditObject) {
    var d = redditObject[0].data.children[0].data
    let url = "https://www.reddit.com" + d.permalink.slice(0, -1) + ".json"
    let post = new RedditPost(d.author, d.title, d.selftext, url)

    // Commentaires
    var children = redditObject[1].data.children
    for (let child of children) {
        post.comments.push(child.data.body)
    }

    return post
}

// Affiche les posts en utilisant les APIs DOM
function displayPosts(posts) {

    function createElementWithText(element, text) {
        let el = document.createElement(element)
        el.appendChild(document.createTextNode(text))
        return el
    }

    for (let post of posts) {

        document.body.appendChild(createElementWithText("H1", post.title))
        document.body.appendChild(createElementWithText("P", post.author))
        document.body.appendChild(createElementWithText("P", post.text))

        let commentsNode = document.createElement("UL")
        document.body.appendChild(commentsNode)

        for (let comment of post.comments) {
            commentsNode.appendChild(createElementWithText("LI", comment))
        }

    }
}

// Fonction adaptée de: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function handleErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
}

function getRedditRecentPosts(subreddit) {
    return fetch("https://www.reddit.com/r/" + subreddit + ".json")
        .then(handleErrors)
        .then(response => response.json())
        .then(RedditPost.parsePosts)
}


function getRedditPost(url) {
    return fetch(url)
        .then(handleErrors)
        .then(response => response.json())
        .then(RedditPost.parsePost)
}

function printETSPosts() {

    getRedditRecentPosts("etsmtl").then((posts) => {
        let counter = 0;
        let proms = [];

        for (const post of posts) {
            proms.push(getRedditPost(post.url));
            if (counter == 5)
                break;
            counter++;
        }
        return Promise.all(proms);
    })
    .then((recentPosts)=>{
        console.log(recentPosts);

        displayPosts(recentPosts)
    });
}

printETSPosts()
//getRedditRecentPosts("etsmtl");
//getRedditPost("https://www.reddit.com/r/etsmtl.json");
