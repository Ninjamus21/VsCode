// opgave14.2.js
import express from 'express';
const app = express();
import fetch from 'node-fetch';

const userUrl = 'https://jsonplaceholder.typicode.com/users';
const port = 8080;


async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
    throw new Error(respons.status);
    return await respons.json();
}

function genererTabel(users) {
    let html = '<table>';
    for (let user of users) {
        html +=
        '<tr><td>' + user.id +
        '</td><td>' + user.name +
        '</td><td>' + user.company.name +
        '</td></tr>\n';
    }
    html += '</table>';
    return html;
}

async function GetHtml() {
    let users = await get(userUrl);
    let html = genererTabel(users);
    return html;
}

app.get('/', async (req, res) => {
    try {
        let html = await GetHtml();
        res.send(html);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});