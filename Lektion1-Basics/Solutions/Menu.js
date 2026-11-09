"use strict";

// Console menu (synchronous) using readline-sync
const readlineSync = require('readline-sync');

// Simple in-memory name list and operations
let names = [];

function addName(name) {
    if (typeof name !== "string") {
        throw new TypeError("Navnet skal være en streng.");
    }    

    const cleanName = name.trim();
    if (cleanName.length === 0) {
        throw new Error("Navnet kan ikke være tomt.");
    }    

    names.push(cleanName);
    return names;
}    

function removeByIndex(index) {
    if (!Number.isInteger(index) || index < 0 || index >= names.length) {
        throw new RangeError("Index er uden for listen.");
    }    

    const removedName = names.splice(index, 1)[0];
    return removedName;
}    

function removeByName(name) {
    if (typeof name !== "string") {
        throw new TypeError("Navnet skal være en streng.");
    }    

    const cleanName = name.trim();
    const index = names.indexOf(cleanName);

    if (index === -1) {
        return null;
    }    

    return removeByIndex(index);
}    

function overwriteAtIndex(index, newName) {
    if (!Number.isInteger(index) || index < 0 || index >= names.length) {
        throw new RangeError("Index er uden for listen.");
    }    

    if (typeof newName !== "string") {
        throw new TypeError("Navnet skal være en streng.");
    }    

    const cleanName = newName.trim();
    if (cleanName.length === 0) {
        throw new Error("Navnet kan ikke være tomt.");
    }    

    names[index] = cleanName;
    return names[index];
}    

function showNames() {
    if (!names || names.length === 0) {
        console.log("Listen er tom.");
        return;
    }

    console.log("Nuværende navne:");
    names.forEach((n, i) => console.log(`${i}: ${n}`));
}

function main() {
    console.log("=== Enkel konsolmenu for Menu.js ===");

    while (true) {
        console.log("\nVælg en handling:");
        console.log("1) Vis navne");
        console.log("2) Tilføj navn");
        console.log("3) Fjern ved index");
        console.log("4) Fjern ved navn");
        console.log("5) Overskriv navn ved index");
        console.log("0) Afslut");

        const choice = readlineSync.question('Valg: ').trim();

        try {
            switch (choice) {
                case "1":
                    showNames();
                    break;

                case "2": {
                    const name = readlineSync.question('Indtast navn at tilføje: ');
                    addName(name);
                    console.log('Tilføjet.');
                    showNames();
                    break;
                }

                case "3": {
                    const idxStr = readlineSync.question('Indtast index at fjerne: ');
                    const idx = Number(idxStr);
                    const removed = removeByIndex(idx);
                    console.log(`Fjernet: ${removed}`);
                    showNames();
                    break;
                }

                case "4": {
                    const name = readlineSync.question('Indtast navn at fjerne: ');
                    const removed = removeByName(name);
                    if (removed === null) console.log('Navn ikke fundet.');
                    else console.log(`Fjernet: ${removed}`);
                    showNames();
                    break;
                }

                case "5": {
                    const idxStr = readlineSync.question('Indtast index at overskrive: ');
                    const idx = Number(idxStr);
                    const newName = readlineSync.question('Indtast nyt navn: ');
                    const updated = overwriteAtIndex(idx, newName);
                    console.log(`Opdateret: ${updated}`);
                    showNames();
                    break;
                }

                case "0":
                    console.log('Farvel.');
                    return;

                default:
                    console.log('Ugyldigt valg - prøv igen.');
            }
        } catch (err) {
            console.error('Fejl:', err.message || err);
        }
    }
}

// Export functions for programmatic use
module.exports = {
    names,
    addName,
    removeByIndex,
    removeByName,
    overwriteAtIndex,
    startConsole: main
};

// If executed directly, start the console menu
if (require.main === module) {
    main();
}

