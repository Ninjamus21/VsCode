'use strict';
console.log('VERSION 1 - opgave9.1.js');
let persons = [
    {
        firstName: 'Yazeed',
        lastName: 'Hussein',
        telephone: '1234567890',
        age: 25
    },
    {
        firstName: 'Sam',
        lastName: 'Gamwise',
        telephone: '0987654321',
        age: 30
    },
    {
        firstName: 'Bill',
        lastName: 'Bailey',
        telephone: '5555555555',
        age: 20
    },
    {
        firstName: 'John',
        lastName: 'Pork',
        telephone: '1111111111',
        age: 40
    }

];

// filter for et telefonnummer der starter med 1
let filtered = persons.filter((person) => person.telephone.startsWith('1'));
filtered.forEach(f => console.log(f.firstName + " " + f.lastName + " has a telephone number starting with 1: " + f.telephone));


// find den mindste alder 
let minAgePerson = persons.reduce(
    (minPerson, currentPerson) => currentPerson.age < minPerson.age ? currentPerson : minPerson,
    persons[0]
);
console.log("Personen med den mindste alder er: " + minAgePerson.firstName + " " + minAgePerson.lastName + " med alder: " + minAgePerson.age);

// modifiser personer så de får et id felt
persons = persons.map((person, index) => ({ ...person, id: index + 1 }));
persons.forEach(f => console.log(f.firstName + " " + f.lastName + " has id: " + f.id));

// lave en ny array hvor alle personer navne er og er komma separeret
let namesArray = persons.map(person => person.firstName + " " + person.lastName).join(", ");
console.log("Names array: " + namesArray);

//Generer et array med navn og mobilnummer på de personer, der er yngre end 30
let youngPersons = persons.filter(person => person.age < 30).map(person => ({ name: person.firstName + " " + person.lastName, telephone: person.telephone, age: person.age }));
console.log("unge folk under 30:" + youngPersons.map(p => p.name + " - " + p.age + " alder - " + p.telephone).join(", "));


// opgave 9.2.2
// Definer en compareSort funktion, der tager en compare funktion som parameter og returnerer en sort
// funktion, der bruger denne compare funktion til at sortere et array af strenge.
// Brug compareSort funktionen til at generere en lenSort og en ignoreCaseSort funktion, der bruger
// compareLen hhv. compareIgnoreCase fra opgave 2.3

function compareSort(compareFn) {
    return function (a, b) {
        return compareFn(a, b);
    };
}

console.log("Sorteret efter fornavn:");
let sortedpersons = persons.sort(compareSort((a, b) => a.firstName.localeCompare(b.firstName)));
sortedpersons.forEach(f => console.log(f.firstName));

// opgave 9.2.3
// Modificer compareSort funktionen, så den returnerede sort funktion nu validerer sin parameter.

function compareSortValidated(key, compareFn) {
    return function (a, b) {
        if (typeof a[key] !== 'string' || typeof b[key] !== 'string') {
            throw new Error(`Property "${key}" must be a string on both parameters`);
        }
        return compareFn(a, b);
    };
}
console.log("Sorteret efter fornavn:");
let sortedPersons = persons.sort(
    compareSortValidated('firstName', (a, b) => a.firstName.localeCompare(b.firstName))
);
sortedPersons.forEach(f => console.log(f.firstName));

// opgave 9.2.4
// a. Lav en function Compose(f1, f2, a), der tager to funktioner og et tal som parametre og
// returnerer
// f1(f2(x)). Altså beregner f2(x) og beregner f1(resultatet).

function compose(f1, f2, a) {
    return f1(f2(a));
}

let result = compose((x) => x * 3, (y) => y + 5, 10);
console.log("Result of compose: " + result); // Output: 45 

// b. Lav compose om, så den ikke modtager x som parameter, men kun f1 og f2. Den skal så
// returnere en funktion, der beregner f1(f2(x)). Denne kaldes også f1 o f2

function composefunction(f1, f2) {
    return function (x) {
        return f1(f2(x));
    }
}

let composedFunction = composefunction((x) => x * 3, (y) => y + 5);
let result2 = composedFunction(10);
console.log("Result of composed function: " + result2); // Output: 45

// c. Lav Compose om (eller lav en ny), der tager et array af funktioner [f1, f2, …fn] og returnerer f1 o
// f2 o … o fn

// alle 3 versioner af composeFunctions fungerer, men den sidste er den mest læsbare og effektive
function composeFunctions1(functions) {
    return functions.reduce((f, g) => (x) => compose(f, g, x), (x) => x);
}
function composeFunctions2(functions) {
    return functions.reduce((f, g) => (x) => composeFunction(f, g)(x), (x) => x);
}

// denne version er den mest læsbare og effektive... ikke nogle udnødvendige kald til compose eller composeFunction, men direkte kald til f og g<
function composeFunctions3(functions) {
    return functions.reduce((f, g) => (x) => f(g(x)), (x) => x);
}

let composedFunctions1 = composeFunctions3([(x) => x * 3, (y) => y + 5, (z) => z - 2]);
let result3 = composedFunctions1(10);
console.log("Result of composed functions: " + result3); // Output: 39
/* 
f5: 10 + 3 = 13
f4: 13 / 2 = 6.5
f3: 6.5 - 2 = 4.5
f2: 4.5 + 5 = 9.5
f1: 9.5 * 3 = 28.5 ✔ 
*/
let composedFunctions2 = composeFunctions3([(x) => x * 3, (y) => y + 5, (z) => z - 2, (a) => a / 2, (b) => b + 3]);
let result4 = composedFunctions2(10);
console.log("Result of composed functions 2: " + result4); // Output: 28.5