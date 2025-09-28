let selectElem = document.querySelector('select');
let logo = document.querySelector('img');
let pageContent = document.querySelector('body');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;

    if (current === 'dark') {
        // Dark theme
        pageContent.style.backgroundColor = "black";
        pageContent.style.color = "white";
        pageContent.style.fontFamily = "Arial, sans-serif";
        logo.src = "dark-logo.png";   // replace with your dark logo file
    } else if (current === 'light') {
        // Light theme
        pageContent.style.backgroundColor = "white";
        pageContent.style.color = "black";
        pageContent.style.fontFamily = "Georgia, serif";
        logo.src = "light-logo.png";  // replace with your light logo file
    } else {
        // Fallback (default)
        pageContent.style.backgroundColor = "initial";
        pageContent.style.color = "initial";
        logo.src = "default-logo.png"; // optional
    }
}

const PI = 3.14;
let radius = 3;
              
let area = radius * radius * PI;

console.log(area);

radius = 20;


area = radius * radius * PI;

console.log(area);