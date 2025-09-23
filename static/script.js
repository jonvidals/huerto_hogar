// ===== HERO IMAGES ROTATION (multi-página) =====
(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Sets por página
    const HERO_SETS = {
        index: [
            'https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg',
            'https://images.pexels.com/photos/19162212/pexels-photo-19162212/free-photo-of-agricultura-granja-manzanas-fruta.jpeg',
            'https://images.pexels.com/photos/18510514/pexels-photo-18510514/free-photo-of-comida-sano-naturaleza-rojo.jpeg'
        ],
        logged: [
            'https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg',
            'https://images.pexels.com/photos/19162212/pexels-photo-19162212/free-photo-of-agricultura-granja-manzanas-fruta.jpeg',
            'https://images.pexels.com/photos/18510514/pexels-photo-18510514/free-photo-of-comida-sano-naturaleza-rojo.jpeg'
        ],
        prod: [
            'https://c.pxhere.com/photos/f7/ce/apple_fruits_fruit_harvest_time_frisch_harvest_yield_fuji-1054761.jpg!d',
            'https://upload.wikimedia.org/wikipedia/commons/9/93/Produci%C3%B3n_de_C%C3%ADtricos_en_Veinticinco_de_Diciembre.jpg',
            'https://static.eldiario.es/clip/607dea5a-1c91-42bd-859b-43600699c34f_16-9-discover-aspect-ratio_default_0.jpg'
        ]
    };

    const dataKey = (document.body.dataset.page || '').toLowerCase();
    const classKey = Object.keys(HERO_SETS).find(k => document.body.classList.contains(k));
    const pageKey = dataKey || classKey || 'index';

    const images = HERO_SETS[pageKey] || HERO_SETS.index;

    const interval = Number(document.body.dataset.heroInterval) || 5000;

    let idx = 0;
    const applyBg = () => hero.style.backgroundImage = `url('${images[idx]}')`;

    applyBg();
    if (images.length > 1) {
        setInterval(() => {
            idx = (idx + 1) % images.length;
            applyBg();
        }, interval);
    }
})();


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

        list.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'li') {
                input.value = e.target.textContent;
                list.style.display = 'none';
                input.focus();
            }
        });

        input.addEventListener('blur', () => {
            setTimeout(() => list.style.display = 'none', 150);
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const userLink = document.querySelector('.user-link');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');

    const registerBtn = loginModal.querySelector('.btn-outline');
    const loginReturnBtn = registerModal.querySelector('.switch-modal');

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

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

// Función que muestra los productos en las tarjetas
function mostrarProductos(productos) {
    const contenedor = document.querySelector('.cards');
    contenedor.innerHTML = '';  // Limpiamos el contenedor antes de agregar nuevos productos

    productos.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>Stock: ${prod.stock}</p>
        <p>$${prod.precio}</p>
        <button class="btn-add-cart">AÑADIR AL CARRITO</button>`;
        contenedor.appendChild(card);
    });
}

function cargarProductosPorCategoriaYSUB(categoria, subcategoria = 'todos') {
    const rutaJSON = '../db/productos.json';
    fetch(rutaJSON)
        .then(response => response.json())
        .then(productos => {
            const productosFiltrados = productos.filter(producto =>
                producto.categoria.toLowerCase() === categoria.toLowerCase() &&
                (producto.subcategoria.toLowerCase() === subcategoria.toLowerCase() || subcategoria === 'todos')
            );
            mostrarProductos(productosFiltrados);
        })
        .catch(error => console.log("Error al cargar los productos", error));
}

function cargarTodosLosProductos() {
    const rutaJSON = '../db/productos.json';
    fetch(rutaJSON)
        .then(response => response.json())
        .then(productos => {
            mostrarProductos(productos);
        })
        .catch(error => console.log("Error al cargar los productos", error));
}

const path = window.location.pathname;
let categoria = '';
let subcategoria = 'todos';

if (path.includes('frutas-frescas.html')) {
    categoria = 'frutas frescas';
} else if (path.includes('productos-lacteos.html')) {
    categoria = 'productos lacteos';
} else if (path.includes('verduras-organicas.html')) {
    categoria = 'verduras organicas';
} else if (path.includes('productos-organicos.html')) {
    categoria = 'productos organicos';
} else if (path.includes('productos.html')) {
    categoria = 'todos';
}

if (categoria !== 'todos') {

    cargarProductosPorCategoriaYSUB(categoria, subcategoria);
} else if (categoria === 'todos') {
    cargarTodosLosProductos();
}


/* carritou */
let cart = [];

const cartItemsContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");

function mostrarProductos(productos) {
    const contenedor = document.querySelector('.cards');
    contenedor.innerHTML = '';

    productos.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>Stock: ${prod.stock}</p>
        <p>$${prod.precio}</p>
        <button class="btn-add-cart" 
        data-name="${prod.nombre}" 
        data-price="${prod.precio}"
        data-image="${prod.imagen}">
        AÑADIR AL CARRITO </button>`;
        contenedor.appendChild(card);
    });

    activarBotonesCarrito();
}

const carro = document.getElementById("carro");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCart");

function openCart() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
    cartPanel.setAttribute("aria-hidden", "false");
    if (closeCartBtn) closeCartBtn.focus();
}

function closeCart() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
    cartPanel.setAttribute("aria-hidden", "true");
}

if (carro) {
    carro.addEventListener("click", (e) => {
        e.preventDefault();
        openCart();
    });
}

if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartPanel.classList.contains("active")) {
        closeCart();
    }
});


function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-thumb">
      <div class="item-info">
        <span class="item-name">${item.name}</span>
        <div class="item-controls">
          <button class="qty-btn minus" data-index="${index}">➖</button>
          <span class="item-qty">${item.quantity}</span>
          <button class="qty-btn plus" data-index="${index}">➕</button>
          <span class="item-subtotal">$${item.price * item.quantity}</span>
        </div>
      </div>
    `;
        cartItemsContainer.appendChild(li);
    });

    cartTotalEl.textContent = total;
}

function addToCart(name, price, image) {
    const p = parseInt(price, 10) || 0;
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price: p, quantity: 1, image });
    }
    renderCart();
}


function activarBotonesCarrito() {
    document.querySelectorAll(".btn-add-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            addToCart(btn.dataset.name, btn.dataset.price, btn.dataset.image);
        });
    });
}


cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        renderCart();
    }
});

cartItemsContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (index === undefined) return;

    if (e.target.classList.contains("plus")) {
        cart[index].quantity++;
        renderCart();
    }

    if (e.target.classList.contains("minus")) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        renderCart();
    }
});
document.addEventListener("DOMContentLoaded", () => {
  const sidebarButtons = document.querySelectorAll(".sidebar-dropbtn");

  sidebarButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".sidebar-dropdown");
      parent.classList.toggle("active");

      document.querySelectorAll(".sidebar-dropdown").forEach(drop => {
        if (drop !== parent) drop.classList.remove("active");
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sidebar-dropbtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".sidebar-dropdown");
      parent.classList.toggle("active");

      // cerrar los demás dropdowns si hay varios
      document.querySelectorAll(".sidebar-dropdown").forEach(drop => {
        if (drop !== parent) drop.classList.remove("active");
      });
    });
  });
});
 function initMap() {
            
            const sucursales = [
                { name: "Sucursal Santiago Centro", position: { lat: -33.4378, lng: -70.6505 } },
                { name: "Sucursal Providencia", position: { lat: -33.4168, lng: -70.6040 } },
                { name: "Sucursal Las Condes", position: { lat: -33.3930, lng: -70.5670 } }
            ];

            // Centro del mapa
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 12,
                center: sucursales[0].position
            });

            // Marcadores
            sucursales.forEach(sucursal => {
                const marker = new google.maps.Marker({
                    position: sucursal.position,
                    map: map,
                    title: sucursal.name
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<h3>${sucursal.name}</h3>`
                });

                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });
            });
        }