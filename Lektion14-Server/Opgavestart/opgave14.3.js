import express from 'express';
import cors from 'cors';
const app = express();
const port = 8080;

let Beskeder = [
    { nr: 1, besked: "Ole", chatRum: "rum1" },
    { nr: 2, besked: "Ib", chatRum: "rum2" },
    { nr: 3, besked: "Ole", chatRum: "rum3" }
];
// Højeste nr hidtil. Stiger kun, så slettede numre aldrig genbruges.
let sidsteNr = Beskeder.reduce((max, b) => Math.max(max, b.nr), 0);

app.use(cors());
app.use(express.json());

function log(request, response, next) {
    console.log(request.method + ': ' + request.url);
    next();
}
app.use(log);

app.get('/beskeder', (request, response) => {
    response.send(Beskeder);
});

app.get('/beskeder/rum/:chatRum', (request, response) => {
    const retur = Beskeder.filter(b => b.chatRum === request.params.chatRum);
    response.send(retur);
});

app.get('/rum', (request, response) => {
    const retur = [...new Set(Beskeder.map(b => b.chatRum))];
    response.send(retur);
});

app.post('/beskeder', (request, response) => {
    const { besked, chatRum } = request.body ?? {};

    if (typeof besked !== 'string' || typeof chatRum !== 'string' || !besked.trim() || !chatRum.trim()) {
        return response.status(400).send('Send JSON: { "besked": "...", "chatRum": "..." }');
    }

    sidsteNr++;
    const ny = { nr: sidsteNr, besked: besked.trim(), chatRum: chatRum.trim() };
    Beskeder.push(ny);
    response.status(201).send(ny);
});

app.delete('/besked/:nr', (request, response) => {
    const nr = Number(request.params.nr);
    if (!Number.isInteger(nr)) {
        return response.status(400).send('nr skal være et heltal');
    }

    const index = Beskeder.findIndex(b => b.nr === nr);
    if (index === -1) {
        return response.status(404).send('Besked ' + nr + ' findes ikke');
    }

    Beskeder.splice(index, 1);
    response.send('Deleted');
});

app.listen(port, () => {
    console.log('Lytter på port ' + port + ' ...');
});