let navn1 = "Adam"
let navn2 = "Ida"
let navn3 = "adam"
console.log(compare(navn1, navn2));
console.log(compare(navn2, navn1));

console.log(compareLen(navn1, navn2));
console.log(compareIgnoreCase(navn1, navn3));
console.log("hello");


function compare(s1, s2) {
    if (s1 < s2) {
        return -1;
    } else if (s1 > s2) {
        return 1;
    } else {
        return 0;
    }
}

function compareLen(s1, s2) {
    if (s1.length < s2.length) {
        return -1;
    } else if (s1.length > s2.length) {
        return 1;
    } else {
        return 0;
    }
}

function compareIgnoreCase(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    if (s1 < s2) {
        return -1;
    } else if (s1 > s2) {
        return 1;
    } else {
        return 0;
    }
}