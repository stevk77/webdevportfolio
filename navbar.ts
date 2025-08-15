document.addEventListener('DOMContentLoaded', function () {
    const navbarDiv = document.getElementById('navbar');
    if (navbarDiv) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(html => {
                navbarDiv.innerHTML = html;
            });
    }
});