document.addEventListener('DOMContentLoaded', () => {
  
    fetch('../db/users.json')
      .then(response => {
        if (!response.ok) throw new Error('No se pudo cargar el JSON');
        return response.json();
      })
      .then(data => {
        const usuarios = data;
  
        const form = document.getElementById('loginForm');
        const mensaje = document.getElementById('mensaje');
  
        if (!form) {
          console.error('Formulario no encontrado');
          return;
        }
  
        form.addEventListener('submit', function (e) {
          e.preventDefault();
  
          const usuarioInput = document.getElementById('usuario').value.trim();
          const passwordInput = document.getElementById('password').value;
  
          const usuarioEncontrado = usuarios.find(
            u => u.email === usuarioInput && u.password === passwordInput
          );
  
          if (!usuarioEncontrado) {
            mensaje.style.color = 'red';
            mensaje.textContent = 'Usuario o contraseña incorrectos';
            return;
          }
  
          if (usuarioEncontrado.rol !== 'admin') {
            mensaje.style.color = 'red';
            mensaje.textContent = 'Acceso denegado: no eres admin';
            return;
          }
  
          window.location.href = 'index.html';

  
          // Aquí puedes redirigir al dashboard u otra vista
          // window.location.href = "/admin/dashboard.html";
        });
      })
      .catch(error => {
        console.error('Error al cargar usuarios:', error);
        const mensaje = document.getElementById('mensaje');
        if (mensaje) {
          mensaje.style.color = 'red';
          mensaje.textContent = 'Error al cargar usuarios.';
        }
      });
  });
  