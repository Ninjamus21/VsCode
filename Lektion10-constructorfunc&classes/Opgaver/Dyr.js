// --- Animal ---
function Animal(navn, alder) {
    this.navn = navn;
    this.alder = alder;
}
Animal.prototype.canRun = function () {
    console.log(this.navn + " kan løbe");
};

const kat = new Animal("Misser", 2);
const hund = new Animal("Fido", 5);
console.log(kat.navn + " er " + kat.alder + " år gammel");
kat.canRun();
hund.canRun();

// --- Human (endnu uden arv) ---
function Human(navn, alder, penge) {
    Animal.call(this, navn, alder); // i stedet for this.navn = ..., this.alder = ...
    this.penge = penge;
}
Human.prototype.canEarn = function () {
    console.log(this.navn + " kan tjene penge");
};

const human1 = new Human("Alice", 30, 1000);
const human2 = new Human("Bob", 25, 500);
human1.canEarn();
human2.canEarn();
console.log(human1.navn, human1.alder, human1.penge); // Animal.call virker

// --- Check: ingen arv endnu ---
console.log("Før linkning:");
console.log(typeof human1.canRun); // "undefined"
console.log(typeof kat.canEarn);   // "undefined"

// --- Link prototyper ---
Object.setPrototypeOf(Human.prototype, Animal.prototype);
// (samme som Human.prototype.__proto__ = Animal.prototype)

console.log("Efter linkning:");
human1.canRun();                    // virker nu
human2.canRun();
console.log(typeof human1.canEarn); // "undefined"
console.log(typeof kat.canEarn);    // stadig "undefined"
console.log(human1 instanceof Animal); // true

// --- Override canRun på human2 ---
human2.canRun = function () {
    console.log(this.navn + " kan ikke løbe, han tager bussen");
};

human1.canRun(); // gammel: "Alice kan løbe"
kat.canRun();    // gammel: "Misser kan løbe"
hund.canRun();   // gammel: "Fido kan løbe"
human2.canRun(); // ny: override