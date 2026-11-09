import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Produkter med id
const tekster = [
    { id: 1, tekst: 'æble', pris: 10 },
    { id: 2, tekst: 'banan', pris: 20 },
    { id: 3, tekst: 'pære', pris: 30 }
];
let nextId = 4;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/index');
});

app.get('/index', (req, res) => {
    res.render('index', { tekster });
});

app.post('/tilfoej', (req, res) => {
    const tekst = typeof req.body.tekst === 'string' ? req.body.tekst.trim() : '';
    const pris = parseFloat(req.body.pris);

    if (isNaN(pris)) {
        return res.status(400).send('Prisen skal være et tal');
    }
    if (!tekst) {
        return res.status(400).send('Teksten må ikke være tom');
    }

    tekster.push({ id: nextId++, tekst, pris });
    res.status(201).send('Teksten blev tilføjet');
});

// NY: modtager id'et fra knappen
app.post('/produkt', (req, res) => {
    const id = parseInt(req.body.id);
    const produkt = tekster.find(p => p.id === id);

    if (!produkt) {
        return res.status(404).send('Produktet blev ikke fundet');
    }

    console.log('Der blev klikket på:', produkt);
    res.status(201).send('OK');
});


app.post('/buy', (req, res) => {
    const { id } = req.body;
    console.log('Buy modtaget, id:', id);
    res.status(201).send('OK');
});

app.listen(8000, () => {
    console.log('Lytter på port 8000 ...');
});