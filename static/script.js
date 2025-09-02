// ==================== HERO SLIDER ====================
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

// Inicializar hero
hero.style.backgroundImage = `url('${images[0]}')`;
setInterval(changeHero, 5000);

// ==================== MENU TOGGLE ====================
document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.querySelector('.menu-toggle');

  menuToggle?.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });

  window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }
  });
});

