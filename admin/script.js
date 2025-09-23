document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const mensaje = document.getElementById("mensaje");

  // --- Validación para páginas admin (home) ---
  if (document.body.classList.contains("admin-home")) {
    const admin = localStorage.getItem("isAdmin");
    if (!admin || admin !== "true") {
      window.location.href = "login.html";
    }
    return; // No ejecutar el login en el home
  }

  // --- Login ---
  if (!form) return;

  fetch("../db/users.json")
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el JSON");
      return response.json();
    })
    .then(usuarios => {

      form.addEventListener("submit", function(e) {
        e.preventDefault();

        const usuarioInput = document.getElementById("usuario").value.trim();
        const passwordInput = document.getElementById("password").value;

        const usuarioEncontrado = usuarios.find(
          u => u.email === usuarioInput && u.password === passwordInput
        );

        if (!usuarioEncontrado) {
          mensaje.style.color = "red";
          mensaje.textContent = "Usuario o contraseña incorrectos";
          return;
        }

        if (usuarioEncontrado.rol !== "admin") {
          mensaje.style.color = "red";
          mensaje.textContent = "Acceso denegado: no eres admin";
          return;
        }

        // Guardar que el usuario es admin
        localStorage.setItem("isAdmin", "true");

        // Redirigir al home
        window.location.href = "index.html";
      });
    })
    .catch(error => {
      console.error("Error al cargar usuarios:", error);
      if (mensaje) {
        mensaje.style.color = "red";
        mensaje.textContent = "Error al cargar usuarios.";
      }
    });

});
   // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isAdmin');
        window.location.href = "login.html";
    });

    // Toggle sidebar
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.admin-sidebar');
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
    