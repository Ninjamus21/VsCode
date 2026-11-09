// promise1.js
function langvarig(nr) {
    return new Promise(function (resolve, reject) {
        let tal = Math.trunc(Math.random() * 3);
        if (tal === 0) throw new Error(`${nr} Slet ikke OK! fordi tallet var ${tal}`);
        setTimeout(afslut, 2000);
        function afslut() {
            if (tal === 1) resolve(`${nr} OK! tallet var ${tal}`);
            else if (tal === 2) reject(`${nr} Ikke OK! tallet var ${tal}`);
        }
    });
}

langvarig(47)
    .then(resultat => console.log('Resultat: ' + resultat.toString() + " " + new Date().toTimeString()))
    .catch(fejl => console.log('Fejl/exception: ' + fejl + " " + new Date().toTimeString()));

console.log('Efter kald af langvarig()' + " " + new Date().toTimeString());