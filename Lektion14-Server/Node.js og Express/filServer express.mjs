// filServer.js
import express from 'express';
const app = express();
import { promises as fs } from 'fs';

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function genererLinks(filnavne) {
    let html = '';
    for (let filnavn of filnavne) {
        html += '<a href="' + filnavn + '">' + filnavn + '</a><br>\n';
    }
    return html;
}

app.get('/', async (request, response) => {
    let sti = 'C:\\Users\\klbo\\OneDrive - EFIF\\DIP\\S23\\Session 14\\Eksempler\\Node.js og Express\\filer';
        console.log(sti);
        let filnavne = await fs.readdir(sti);
        let html = genererLinks(filnavne);
        
    response.send(html);
})
app.use(express.static(__dirname + '/filer')); //ellers virker links ikke

app.listen(8080);
console.log('Lytter på port 8080 ...');