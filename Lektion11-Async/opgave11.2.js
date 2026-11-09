// opgave11.2.js
const userUrl = 'https://jsonplaceholder.typicode.com/users';
const postUrl = 'https://jsonplaceholder.typicode.com/posts?userId=';

// -- forbind 
async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

// -- visning ---------
function visFejl(err) {
    console.log("Fejl: " + err.message);
    document.getElementById("liste").innerHTML =
        "<tr><td colspan='4'>Fejl: " + err.message + "</td></tr>";
}

function visPostFejl(err) {
    console.log("Fejl: " + err.message);
    document.getElementById("postListe").innerHTML =
        "<tr><td colspan='3'>Fejl: " + err.message + "</td></tr>";
}

function visData(data) {
    const tbody = document.getElementById('liste');
    tbody.innerHTML = '';
    const users = Array.isArray(data) ? data : [data];
    for (const user of users) {
        const tr = document.createElement('tr');
        tr.innerHTML =
            "<td>" + user.id + "</td>" +
            "<td>" + user.name + "</td>" +
            "<td>" + user.company.catchPhrase + "</td>";
            // click lytter også et promise kald til hentPosts(user.id) som henter posts for den valgte bruger
        tr.addEventListener("click", () => {
            for (const r of tbody.children) r.classList.remove("selected");
            tr.classList.add("selected");
            hentPosts(user.id);
        });
            tbody.appendChild(tr);
    }
}

function visPosts(user, posts) {
    document.getElementById('postTitel').textContent = 'Posts af ' + user.name;
    const tbody = document.getElementById('postListe');
    tbody.innerHTML = '';
    for (const post of posts) {
        const tr = document.createElement('tr');
        tr.innerHTML =
            "<td>" + post.id + "</td>" +
            "<td>" + post.title + "</td>" +
            "<td>" + post.body + "</td>";
        tbody.appendChild(tr);
    }
}

// -- kald med async/await ---------

async function hentmedasync() {
    try {
        const data = await get(userUrl);
        visData(data);
    }
    catch (err) {
        console.log("Fejl: " + err.message);
        visFejl(err);
    }
}

async function hentPosts(userId) {
    try {
        const user = await get(userUrl + '/' + userId);
        const posts = await get(postUrl + userId);
        visPosts(user, posts);
    } catch (err) {
        visPostFejl(err);
    }
}
        

hentmedasync(); // kald med async/await
