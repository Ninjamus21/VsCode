let personer = [];
let valgtPersonId = null; // holder styr på hvem der er valgt (nu et index, ikke et id)

// --- Tilføj person ---
let tilføjBtn = document.querySelector("#tilføj");
tilføjBtn.onclick = () => {
    let navn = document.querySelector("#navn").value;
    let alder = document.querySelector("#alder").value;
    if (navn.trim() === "" || alder.trim() === "") return; // simpel validering

    tilføjPerson(navn, alder);

    document.querySelector("#navn").value = "";
    document.querySelector("#alder").value = "";
};

function tilføjPerson(navn, alder) {
    const person = { navn, alder };
    personer.push(person);
    updatePersonerList();
}

// --- Ryd hele listen ---
let rydBtn = document.querySelector("#ryd");
rydBtn.onclick = () => {
    personer = [];
    valgtPersonId = null;
    updatePersonerList();
    clearSelectedPerson();
};

// --- Søg ---
let searchInput = document.querySelector("#søg");
let searchBtn = document.querySelector("#search");

searchBtn.onclick = () => {
    let query = searchInput.value.toLowerCase();
    let filteredPersoner = personer.filter(person =>
        person.navn.toLowerCase().includes(query)
    );
    updatePersonerList(filteredPersoner);
};

// --- Slet valgt person ---
let sletBtn = document.querySelector("#slet");
sletBtn.onclick = () => {
    if (valgtPersonId === null) return; // ingen valgt endnu

    personer = personer.filter((person, i) => i !== valgtPersonId);
    valgtPersonId = null;
    updatePersonerList();
    clearSelectedPerson();
};

// --- Render listen: index skrives ud som data-attribut, IKKE som onclick ---
function updatePersonerList(liste = personer) {
    let personerList = document.querySelector("#personer");
    personerList.innerHTML = "";

    liste.forEach((person) => {
        let realIndex = personer.indexOf(person); // find personens ægte plads i det fulde array

        personerList.innerHTML +=
            '<li data-index="' + realIndex + '">' +
            person.navn + ' (' + person.alder + ' år)' +
            '</li>';
    });

    tilknytEventListener(); // tilknyt event listeners til de nye li-elementer
}

function tilknytEventListener() {
    let alleRækker = document.querySelectorAll("#personer li");
    alleRækker.forEach((raekke) => {
        let index = Number(raekke.dataset.index); // hent index fra data-index attribut (er altid en string, konverteres til tal)
        raekke.addEventListener("click", () => selectPerson(index));
    });
}

// --- Klik på en person ---
function selectPerson(index) {
    const person = personer[index];
    if (!person) return;

    valgtPersonId = index;
    document.getElementById("selectedPerson").innerText =
        person.navn + ' (' + person.alder + ' år)';
}

function clearSelectedPerson() {
    document.getElementById("selectedPerson").innerText = "";
}