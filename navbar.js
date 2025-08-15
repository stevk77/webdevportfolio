document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
})

const injectNavbar = () => {
    var navbarDiv = document.getElementById('navbar');
    console.log(navbarDiv);
    if (navbarDiv) {
        fetch('navbar.html')
            .then((response) => response.text())
            .then((html) => navbarDiv.innerHTML = html);
    }
}
