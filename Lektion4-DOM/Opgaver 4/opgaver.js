// opgave 4.1

for (let select of document.querySelectorAll("p")) {
    select.className = "red";
}

// opgave 4.2 

for (let select of document.querySelectorAll("h1")) {
    select = select.nextElementSibling;
    if (select != null) {
        select.style.color = "brown";
    }
}

// opgave 4.3
const items = document.querySelectorAll("li");
for (let i = 0; i < items.length; i++) {
    if (i % 2 == 1) {
        items[i].style.color = "lightgray";
    }
}

// opgave 4.4

for (let select of document.querySelectorAll("h1")) {
    select = select.nextElementSibling;
    if (select != null) {
        select.outerHTML = "<h2>" + select.innerHTML + "</h2>";
    }
}

// opgave 4.5

// bruteforce approach
// document.body.innerHTML = '<div id="container"> <p> List of headings </p></div>' + document.body.innerHTML;

document.body.insertAdjacentHTML("afterbegin", '<div id="container"> <p> List of headings </p></div>');
let container = document.querySelector("#container");
let id = 1;

let html = "";
for (let h of document.querySelectorAll("h1,h2")) {
    h.id = "id" + id;
    html += '<a href = "#id' + id++ + '">' + h.tagName + '</a><br>';
}
container.innerHTML = html