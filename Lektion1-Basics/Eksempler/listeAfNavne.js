// navneListe.js
// Konsol-program der vedligeholder en liste af navne

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let navne = [];

function sporg(sporgsmaal) {
    return new Promise((resolve) => {
        rl.question(sporgsmaal, (svar) => resolve(svar));
    });
}

function visMenu() {
    console.log('\n===== MENU =====');
    console.log('1. Tilføj et navn');
    console.log('2. Fjern et navn ud fra index');
    console.log('3. Fjern et navn ud fra navn (hvis det findes)');
    console.log('4. Overskriv et navn på et index');
    console.log('5. Udskriv alle navnene');
    console.log('6. Konkatener alle navnene og udskriv resultatet');
    console.log('0. Afslut');
}

async function tilfoejNavn() {
    let navn = await sporg('Indtast navn der skal tilføjes: ');
    navne.push(navn);
    console.log(`"${navn}" er tilføjet.`);
}

async function fjernNavnVedIndex() {
    let indexInput = await sporg('Indtast index der skal fjernes: ');
    let index = parseInt(indexInput);

    if (isNaN(index) || index < 0 || index >= navne.length) {
        console.log('Ugyldigt index.');
        return;
    }

    let fjernet = navne.splice(index, 1);
    console.log(`"${fjernet[0]}" er fjernet fra index ${index}.`);
}

async function fjernNavnVedNavn() {
    let navn = await sporg('Indtast navnet der skal fjernes: ');
    let index = navne.indexOf(navn);

    if (index === -1) {
        console.log(`"${navn}" findes ikke i listen.`);
        return;
    }

    navne.splice(index, 1);
    console.log(`"${navn}" er fjernet.`);
}

async function overskrivNavn() {
    let navn = await sporg('Indtast nyt navn: ');
    let indexInput = await sporg('Indtast index der skal overskrives: ');
    let index = parseInt(indexInput);

    if (isNaN(index) || index < 0 || index >= navne.length) {
        console.log('Ugyldigt index.');
        return;
    }

    let gammeltNavn = navne[index];
    navne[index] = navn;
    console.log(`Index ${index} er ændret fra "${gammeltNavn}" til "${navn}".`);
}

function udskrivAlleNavne() {
    if (navne.length === 0) {
        console.log('Listen er tom.');
        return;
    }

    console.log('Navne i listen:');
    for (let i = 0; i < navne.length; i++) {
        console.log(`${i}: ${navne[i]}`);
    }
}

function konkatenerNavne() {
    let resultat = navne.join('');
    console.log(`Konkateneret resultat: "${resultat}"`);
}

async function main() {
    let fortsaet = true;

    while (fortsaet) {
        visMenu();
        let valg = await sporg('Vælg en mulighed: ');

        switch (valg) {
            case '1':
                await tilfoejNavn();
                break;
            case '2':
                await fjernNavnVedIndex();
                break;
            case '3':
                await fjernNavnVedNavn();
                break;
            case '4':
                await overskrivNavn();
                break;
            case '5':
                udskrivAlleNavne();
                break;
            case '6':
                konkatenerNavne();
                break;
            case '0':
                fortsaet = false;
                console.log('Programmet afsluttes.');
                break;
            default:
                console.log('Ugyldigt valg, prøv igen.');
        }
    }

    rl.close();
}

main();