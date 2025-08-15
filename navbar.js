var navbarDiv = document.getElementById('navbar');
if (navbarDiv) {
    fetch('navbar.html')
        .then(function (response) { return response.text(); })
        .then(function (html) {
        navbarDiv.innerHTML = html;
    });
}
