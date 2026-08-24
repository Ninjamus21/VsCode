let tekst = "() [{ }]"
let tekst2 = "({[]}" 

console.log(checkKlammer(tekst));
console.log(checkKlammer(tekst2));

function checkKlammer(tekst) {
    let stack = [];
    for (let i = 0; i < tekst.length; i++) {
        let char = tekst[i];
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
            if (stack.length === 0) {
                return false;
            }
            stack.pop();
        }
    }
    return stack.length === 0;
}