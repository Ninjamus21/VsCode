// async2.js
function langvarig(Navn) {
    return new Promise(function (resolve, reject) {
        let timeout=Math.trunc(Math.random()*5000)
        let type = Math.trunc(Math.random() * 3);
        if (type === 0) throw new Error(`${Navn} sprang i luften!`);
        setTimeout(afslut, timeout);
        function afslut() {
            if (type === 1) resolve(`${Navn} OK!`);
            else if (type === 2) reject(`${Navn} Ikke OK!`);
        }
    });
}

async function main() {
    try {
        let resultat = await langvarig("Klaus");
        console.log('Resultat: ' + resultat);
        resultat = await langvarig("Kurt");
        console.log('og ' + resultat);
    }
    catch (e) {
        console.log('Fejl/exception: ' + e);
    }
}
// main();

langvarig("Klaus").then(resultat => console.log('Resultat: ' + resultat), e => console.log("Fejl/Exception" + e))
