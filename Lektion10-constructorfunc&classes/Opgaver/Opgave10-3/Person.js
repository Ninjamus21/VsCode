export class Person {
    #navn;
    #gruppe = null;

    constructor(navn) {
        this.#navn = navn;
    }

    getNavn() {
        return this.#navn;
    }

    getGruppe() {
        return this.#gruppe;
    }

    // gruppe kan være null (= forlad nuværende gruppe)
    setGruppe(gruppe) {
        if (this.#gruppe !== gruppe) {
            const gammel = this.#gruppe;
            this.#gruppe = gruppe;
            if (gammel) gammel.removePerson(this);
            if (gruppe) gruppe.addPerson(this);
        }
    }

    toString() {
        const g = this.#gruppe ? this.#gruppe.getNavn() : "ingen";
        return "Person: " + this.#navn + " (gruppe: " + g + ")";
    }
}