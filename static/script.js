const hero = document.querySelector('.hero');
const images = [
    'https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg',
    'https://images.pexels.com/photos/19162212/pexels-photo-19162212/free-photo-of-agricultura-granja-manzanas-fruta.jpeg',
    'https://images.pexels.com/photos/18510514/pexels-photo-18510514/free-photo-of-comida-sano-naturaleza-rojo.jpeg'
];
let index = 0;
function changeHero() {
    index = (index + 1) % images.length;
    hero.style.backgroundImage = `url('${images[index]}')`;
}
hero.style.backgroundImage = `url('${images[0]}')`;
setInterval(changeHero, 5000);

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    menuToggle.addEventListener('click', () => body.classList.toggle('menu-open'));
    window.addEventListener("scroll", () => window.scrollY > 50 ? body.classList.add("scrolled") : body.classList.remove("scrolled"));
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".btn-search-toggle");
    const searchFormDesktop = document.querySelector(".search-form");
    toggleBtn.addEventListener("click", () => {
        if (window.innerWidth > 600) {
            searchFormDesktop.classList.toggle("active");
            if (searchFormDesktop.classList.contains("active")) searchFormDesktop.querySelector(".search-box").focus();
        }
    });
});
(function () {
    const btn = document.querySelector('.search-toggle');      
    const leftSection = document.querySelector('.left-section'); 
    const input = document.querySelector('.search-input');     

    if (!btn || !leftSection || !input) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        leftSection.classList.toggle('show-search');

        if (leftSection.classList.contains('show-search')) {
            setTimeout(() => input.focus(), 150); 
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            leftSection.classList.remove('show-search');
        }
    });
})();

