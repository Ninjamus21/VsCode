// asyncAll.js
function langvarig(Navn) {
    return new Promise(function (resolve, reject) {
        let type = Math.trunc(Math.random() * 3);
        if (type === 0) throw new Error(`${Navn} sprang i luften!`);
        setTimeout(afslut, 2000);
        function afslut() {
            if (type === 1) resolve(`${Navn} OK!`);
            else if (type === 2) reject(`${Navn} Ikke OK!`);
        }
    });
}

async function main() {
    try {
        let resultater = await Promise.any([langvarig("Klaus"), langvarig("Kurt")]);
        console.log('Resultater: ' + resultater);
    }
    catch (e) {
        console.log('Fejl/exception: ' + e);
    }
}
main();