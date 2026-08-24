let str = "Hej med dig, jeg hedder kaj dup i dupi";
console.log(antalOrd(str));

function antalOrd(str) {
    let ord = str.split(" ");
    return ord.length;
}