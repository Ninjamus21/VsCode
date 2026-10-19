export class Gruppe {
    #navn;
    #personer = [];

    constructor(navn) {
        this.#navn = navn;
    }

    getNavn() {
        return this.#navn;
    }

    // Returnerer en kopi, så man ikke kan pille direkte i listen
    getPersoner() {
        return [...this.#personer];
    }

    addPerson(person) {
        if (!this.#personer.includes(person)) {
            this.#personer.push(person);
            person.setGruppe(this);
        }
    }

    removePerson(person) {
        const index = this.#personer.indexOf(person);
        if (index !== -1) {
            this.#personer.splice(index, 1);
            if (person.getGruppe() === this) {
                person.setGruppe(null);
            }
        }
    }

    toString() {
        return "Gruppe: " + this.#navn;
    }
}