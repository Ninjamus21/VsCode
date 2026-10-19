import { Person } from "./Person.js";
import { Gruppe } from "./Gruppe.js";

const g1 = new Gruppe("A");
const g2 = new Gruppe("B");
const p1 = new Person("Anna");
const p2 = new Person("Børge");
const p3 = new Person("Carla");

g1.addPerson(p1);
console.log(p1.getGruppe() === g1);       // true
p1.setGruppe(g2);                          // flytter fra g1 til g2
console.log(g1.getPersoner().length);    // 0
console.log(g2.getPersoner()[0] === p1);  // true
g2.removePerson(p1);
console.log(p1.getGruppe());              // null
g2.addPerson(p1);
g2.addPerson(p2);
g2.addPerson(p3);
console.log(g2.getPersoner().length);
g2.getPersoner().forEach(p => console.log(p.toString()));


