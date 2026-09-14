let personer = [];
let nextId = 0;
let valgtPersonId = null; // holder styr på hvem der er valgt, så "slet" ved hvem den skal ramme

// --- Tilføj person ---
let tilføjBtn = document.querySelector("#tilføj");
tilføjBtn.onclick = () => {
    let navn = document.querySelector("#navn").value;
    let alder = document.querySelector("#alder").value;
    if (navn.trim() === "" || alder.trim() === "") return; // simpel validering

    tilføjPerson(navn, alder);

    // ryd inputfelterne efter tilføjelse
    document.querySelector("#navn").value = "";
    document.querySelector("#alder").value = "";
};

function tilføjPerson(navn, alder) {
    const person = { id: nextId++, navn, alder };
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

    personer = personer.filter(person => person.id !== valgtPersonId);
    valgtPersonId = null;
    updatePersonerList();
    clearSelectedPerson();
};

// id skrives som ud data-attrubut, IKKE som onclick
// --- Render listen ---
function updatePersonerList(liste = personer) {
    let personerList = document.querySelector("#personer");
    personerList.innerHTML = "";

    for (let person of liste) {
        personerList.innerHTML +=
           '<li data-id="' + person.id + '">' + person.navn + ' (' + person.alder + ' år)</li>';
    }

    tilknytEventListener();
}

function tilknytEventListener(){
    let allereakker = document.querySelectorAll("#personer li");
    for (let raekke of allereakker) {
        let id = Number(raekke.dataset.id);
        raekke.addEventListener("click", () => selectPerson(id));
    }
}

// --- Klik på en person ---
function selectPerson(id) {
    const person = personer.find(p => p.id === id);
    if (!person) return;

    valgtPersonId = person.id;
    document.getElementById("selectedPerson").innerText =
        person.navn + ' (' + person.alder + ' år)';
}

function clearSelectedPerson() {
    document.getElementById("selectedPerson").innerText = "";
}