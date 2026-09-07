

let personer = []
select = document.querySelector("#tilføj");

select.onclick = () => {
    let navn = document.querySelector("[type='text']").value;
    let alder = document.querySelector("[type='number']").value;
    personer.push({ navn, alder });

    updatePersonerList();
}


select = document.querySelector("#ryd");
select.onclick = () => {
    personer = [];
    updatePersonerList();
}

function updatePersonerList() {
    let personerList = document.querySelector("#personer");
    personerList.innerHTML = "";
    for (person of personer) {
        personerList.innerHTML += '<li>' + person.navn + ' (' + person.alder + ' år)</li><br>';
    }
}

let searchInput = document.querySelector("#søg");
let searchBtn = document.querySelector("#search");

searchBtn.onclick = () => {
    searchPerson();
};

function searchPerson() {
    let query = searchInput.value.toLowerCase();
    let filteredPersoner = personer.filter(person => person.navn.toLowerCase().includes(query));
    let personerList = document.querySelector("#personer");
    personerList.innerHTML = "";
    for (person of filteredPersoner) {
        personerList.innerHTML += '<li>' + person.navn + ' (' + person.alder + ' år)</li>';
    }
}

// when click on a person isolate the person and show the name and age in a alert box
let personerList = document.querySelector("#personer");
personerList.onclick = (event) => {
    let clickedPerson = event.target.innerText;
    let person = personer.find(person => clickedPerson.includes(person.navn));
    alert(person.navn + ' (' + person.alder + ' år)');
}
