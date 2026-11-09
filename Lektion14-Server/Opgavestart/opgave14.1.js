// opgave14.1.js
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 8080;

const app = express();

console.log('Lytter på port ' + port + ' ...');

app.use(express.static(__dirname + '/filer')); //ellers virker links ikke

function genererLinks(filnavne) {
    let html = '';
    for (let filnavn of filnavne) {
        html += '<a href="' + filnavn + '">' + filnavn + '</a><br>\n';
    }
    return html;
}

async function GetHtml() {
    let filnavne = await fs.readdir(__dirname + '/filer');
    let html = genererLinks(filnavne);
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
    console.log('Serveren lytter på port ' + port + ' ...');
});

