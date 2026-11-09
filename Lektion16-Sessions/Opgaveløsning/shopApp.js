import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const produkter = [
    { id: 1, navn: 'æble', pris: 10 },
    { id: 2, navn: 'banan', pris: 20 },
    { id: 3, navn: 'pære', pris: 30 }
];
let nextId = 4;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

app.use(express.json());
app.use(session({
    secret: 'hemmelig-noegle',
    resave: false,
    saveUninitialized: true
}));

// Hjælper: find produkter i kurven med antal og linjepris
function byggKurv(session) {
    const kurv = session.kurv || {};           // { produktId: antal }
    const linjer = Object.entries(kurv).map(([id, antal]) => {
        const p = produkter.find(p => p.id === Number(id));
        return { ...p, antal, sum: p.pris * antal };
    });
    const total = linjer.reduce((s, l) => s + l.sum, 0);
    return { linjer, total };
}

app.get('/', (req, res) => res.redirect('/index'));

app.get('/index', (req, res) => {
    res.render('index', { produkter, kurv: byggKurv(req.session) });
});

app.get('/kurv', (req, res) => {
    res.render('kurv', { kurv: byggKurv(req.session) });
})

app.post('/tilfoej', (req, res) => {
    const navn = String(req.body.navn ?? '').trim();
    const pris = parseFloat(req.body.pris);

    if (!navn) return res.status(400).send('Navn må ikke være tomt');
    if (isNaN(pris)) return res.status(400).send('Prisen skal være et tal');

    produkter.push({ id: nextId++, navn, pris });
    res.status(201).send('OK');
});

// Læg i kurv
app.post('/buy', (req, res) => {
    const { id } = req.body;
    if (!produkter.some(p => p.id === Number(id))) {
        return res.status(404).send('Produktet blev ikke fundet');
    }

    req.session.kurv ??= {};
    req.session.kurv[id] = (req.session.kurv[id] || 0) + 1;

    console.log('Kurv:', req.session.kurv);
    res.status(201).send('OK');
});

// Tøm kurv
app.post('/toem', (req, res) => {
    req.session.kurv = {};
    res.status(201).send('OK');
});

app.listen(8000, () => console.log('Lytter på port 8000 ...'));