// tabs.js

let tabs = document.querySelectorAll("h2 span");
let indhold = document.querySelectorAll("h1");

// vis kun den første tab fra start, skjul resten
function visTab(index) {
    indhold.forEach((element, i) => {
        element.style.display = (i === index) ? "block" : "none";
    });
}

// tilknyt klik-eventlistener til hver tab
tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => visTab(index));
});

// vis første tab som standard
visTab(0);