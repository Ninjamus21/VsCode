let personer = [
    { navn: "Adam", alder: 25, Email: "adam@example.com", telefon: "12345678" },
    { navn: "Ida", alder: 30, Email: "ida@example.com", telefon: "87654321" },
    { navn: "Kaj", alder: 20, Email: "kaj@example.com", telefon: "11223344" },
    { navn: "Lise", alder: 35, Email: "lise@example.com", telefon: "55667788" }
];

personer[0].alder = 26;
console.log(personer[0].alder);
console.log(personer[3].navn)
personer[3].navn = "Tove";
console.log(personer[3].navn);
console.log(personer)
delete personer[3]
console.log(personer)