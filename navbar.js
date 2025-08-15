document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
})

const injectNavbar = () => {
    var navbarDiv = document.getElementById('navbar');
    if (navbarDiv) {
        fetch('navbar.html')
            .then((response) => response.text())
            .then((html) => navbarDiv.innerHTML = html);
    }
}
