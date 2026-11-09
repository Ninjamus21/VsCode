// opgave11.1.js
//const userUrl = 'https://jsonplaceholder.typicode.com/users'; // returnere en liste med 10 brugere
const userUrl = 'https://jsonplaceholder.typicode.com/users/11'; // 11 findes ikke, så der returneres en fejl
// const userUrl = 'httpz://jsonplaceholder.typicode.com/users'; // forkert url, så der returneres en fejl

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

// --visning ---------

function visFejl(err) {
    console.log("Fejl: " + err.message);
    document.getElementById("liste").innerHTML =
        "<tr><td colspan='4'>Fejl: " + err.message + "</td></tr>";
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
            "<td>" + user.email + "</td>" +
            "<td>" + user.address.city + "</td>";
        tbody.appendChild(tr);
    }
}

function hentudenasync() {
get(userUrl)
    .then(data => visData(data))
    .catch(err =>  visFejl(err));
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

hentmedasync(); // kald med async/await
