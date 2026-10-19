// opgave10.1.js
class Person {
constructor(navn) { this.navn = navn; }
toString() { return " Person: " + this.navn; }
equals(other) { if(this.navn == other.navn) { return true; } else { return false; } }
compareTo(other) { if(this.navn < other.navn) {return -1;} else if (this.navn > other.navn){ return 1;} else {return 0;} }
}
class Studerende extends Person {
constructor(navn, id) { super(navn); this.id = id; }
toString() { return " Studerende: " + super.toString() + ": " + this.id; };
equals(other) { if(this.navn == other.navn && this.id == other.id) { return true; } else { return false; } }

}

compare = function(a, b) {
    if(a.navn < b.navn) {return -1;}
    else if (a.navn > b.navn){ return 1;
    } else {return 0;}
    }

let p1 = new Person("Viggo");
let p2 = new Person("Børge");
let p3 = new Person("Ida");
let s1 = new Studerende("Ida", 123);
let s2 = new Studerende("Ole", 123);
let s3 = new Studerende("Ida", 321)
let liste = [p1, p2, s1, s2, s3];
class Kat {
constructor(navn) { this.navn = navn; }
toString() { return ' Kat: ' + this.navn; };
}

console.log(p1.compareTo(p2));
console.log(s1.compareTo(p1));
console.log(s1.equals(p1));
console.log(s1.equals(s3));
console.log(p3.equals(s3));
console.log("--------------------");
console.log(compare(p1, p2));
console.log(compare(s1, s2));
console.log(compare(s1, p1));

// sort liste med compare funktion 
liste.push(new Kat("Misser"));
liste.push(new Kat("Lil MISSY"));

console.log(liste.toString());
liste.sort(compare);
console.log(liste.toString());
