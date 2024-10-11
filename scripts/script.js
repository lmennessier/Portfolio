const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');  // Change l'icÃ´ne
    navbar.classList.toggle('active');  // Active le menu
}