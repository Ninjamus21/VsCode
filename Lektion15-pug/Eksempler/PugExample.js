import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import express from 'express';
let app = express();

import { renderFile } from 'pug';
import { join } from 'path';

app.set('view engine', 'pug');
app.set('views', join(__dirname, '/views'));
//Lav data til pug templaten
let valuesForTemplate = { navn: "Ole", alder: 30, venner: [{ navn: "Ib", alder: 12 }, { navn: "hans", alder: 11 }] };
//Eller et lidt mere avanceret eksempel:
// hent users fra 'https://jsonplaceholder.typicode.com/users' eller f.eks. earthquakes
// og send til pug templaten
// eller
// lav et array af users
// send det til pug templaten
// let users = [
//     { navn: "Ib", alder: 12 },
//     { navn: "Hans", alder: 11 },
//     { navn: "Lars", alder: 13 },
//     { navn: "Sofie", alder: 10 }
// ];
// let valuesForTemplateUsers = { users: users };

//Test rendering af pug template til en string i konsollen
console.log(renderFile(join(__dirname, '/views/PugExample.pug'), valuesForTemplate));


app.get('/', (req, response) => response.render('PugExample', valuesForTemplate))

app.listen(8000, () => console.log('Test running'));
