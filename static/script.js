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
document.addEventListener('DOMContentLoaded', function () {
    // Para móviles: toggle de dropdown al hacer click
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault(); // Evita ir al enlace "categorias.html"

            const parentDropdown = this.parentElement;
            const dropdownContent = parentDropdown.querySelector('.dropdown-content');

            // Cierra otros dropdowns si los hay
            document.querySelectorAll('.dropdown-content').forEach(dc => {
                if (dc !== dropdownContent) {
                    dc.classList.remove('show');
                }
            });

            // Alternar visibilidad del dropdown actual
            dropdownContent.classList.toggle('show');
        });
    });

    // Cerrar el dropdown si se toca fuera
    document.addEventListener('click', function (e) {
        const isClickInside = e.target.closest('.dropdown');
        if (!isClickInside) {
            document.querySelectorAll('.dropdown-content').forEach(dc => {
                dc.classList.remove('show');
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const userLink = document.querySelector('.user-link');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');

    // Botones para abrir/cerrar
    const registerBtn = loginModal.querySelector('.btn-outline');
    const loginReturnBtn = registerModal.querySelector('.switch-modal');

    // Muestra u oculta la contraseña en el modal de login
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Muestra u oculta la contraseña en el modal de registro
    const toggleRegPassword = document.getElementById('toggleRegPassword');
    const regPasswordInput = document.getElementById('reg-password');

    if (userLink && loginModal && registerModal) {
        // Abrir el modal de login
        userLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('active');
        });

        // Ocultar modal al hacer clic fuera
        [loginModal, registerModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Cambiar de modal: Login a Registro
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                loginModal.classList.remove('active');
                registerModal.classList.add('active');
            });
        }
        if (loginReturnBtn) {
            loginReturnBtn.addEventListener('click', (e) => {
                e.preventDefault();
                registerModal.classList.remove('active');
                loginModal.classList.add('active');
            });
        }

        // Toggle para mostrar/ocultar contraseña
        function setupPasswordToggle(toggleBtn, input) {
            if (toggleBtn && input) {
                toggleBtn.addEventListener('click', () => {
                    const type = input.type === 'password' ? 'text' : 'password';
                    input.type = type;
                    toggleBtn.classList.toggle('fa-eye-slash');
                });
            }
        }
        setupPasswordToggle(togglePassword, passwordInput);
        setupPasswordToggle(toggleRegPassword, regPasswordInput);
    }
});