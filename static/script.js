// HERO IMAGES ROTATION
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
if (hero) {
    hero.style.backgroundImage = `url('${images[0]}')`;
    setInterval(changeHero, 5000);
}

// MENU TOGGLE Y SCROLL
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => body.classList.toggle('menu-open'));
    }
    window.addEventListener("scroll", () => {
        window.scrollY > 50 ? body.classList.add("scrolled") : body.classList.remove("scrolled");
    });
});

// BUSCADOR RESPONSIVE (MODO DESKTOP Y MÓVIL)
document.addEventListener("DOMContentLoaded", () => {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const leftSection = document.querySelector('.left-section');
    const searchInputDesktop = document.querySelector('.search-input');

    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // MODO MÓVIL: pantalla completa
                searchOverlay.classList.add('active');
            } else {
                // MODO DESKTOP: mini barra
                if (leftSection) {
                    leftSection.classList.toggle('show-search');
                    if (leftSection.classList.contains('show-search') && searchInputDesktop) {
                        setTimeout(() => searchInputDesktop.focus(), 100);
                    }
                }
            }
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
    }
});

// LOGIN MODAL
document.addEventListener("DOMContentLoaded", () => {
    const userLink = document.querySelector('.user-link');
    const loginModal = document.getElementById('loginModal');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
  
    if (userLink && loginModal) {
      // abrir modal
      userLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('active');
      });
  
      // cerrar modal al hacer clic fuera
      loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
          loginModal.classList.remove('active');
        }
      });
  
      // toggle mostrar/ocultar contraseña
      if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
          const type = passwordInput.type === 'password' ? 'text' : 'password';
          passwordInput.type = type;
          togglePassword.classList.toggle('fa-eye-slash');
        });
      }
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const searchInputs = document.querySelectorAll('.search-input');
    const suggestionLists = document.querySelectorAll('.suggestions-list');

    const defaultSuggestions = ["Manzana", "Pera", "Plátano", "Lechuga", "Zanahoria", "Tomate"];

    searchInputs.forEach((input, index) => {
        const list = suggestionLists[index]; // se asegura de usar la lista correcta

        input.addEventListener('input', () => {
            const val = input.value.trim();

            if (!val) {
                list.innerHTML = '';
                list.style.display = 'none';
                return;
            }

            const filtered = defaultSuggestions.filter(item =>
                item.toLowerCase().includes(val.toLowerCase())
            );

            list.innerHTML = filtered.map(item => `<li>${item}</li>`).join('');
            list.style.display = filtered.length ? 'block' : 'none';
        });

        // Selección de sugerencia
        list.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'li') {
                input.value = e.target.textContent;
                list.style.display = 'none';
                input.focus();
            }
        });

        // Ocultar al perder el foco
        input.addEventListener('blur', () => {
            setTimeout(() => list.style.display = 'none', 150);
        });
    });
});

  