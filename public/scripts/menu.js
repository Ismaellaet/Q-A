const openMenu = document.querySelector('.open-menu');
const closeMenu = document.querySelector('.close-menu');

openMenu.addEventListener('click', () => {
    document.body.classList.add('menu-expanded');
})

closeMenu.addEventListener('click', () => {
    document.body.classList.remove('menu-expanded');
})