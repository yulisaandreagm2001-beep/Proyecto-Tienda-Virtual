// --- variables globales ---
const d = document;
const userInput = d.querySelector("#usuarioForm");
const passInput = d.querySelector("#contraForm");
const btnLogin = d.querySelector("#btnLogin");

// Al cargar la página, verifico si hay datos guardados para autocompletar
d.addEventListener("DOMContentLoaded", () => {
    // Intento obtener los datos que guardé en el login anterior
  // Intentamos obtener el usuario del localStorage, si no existe, por defecto es invitado o vendedor
const sesionLocal = JSON.parse(localStorage.getItem("usuario")) || { rol: "vendedor" };

const usuarioActual = {
    nombre: sesionLocal.nombre || "Usuario",
    rol: sesionLocal.rol ? sesionLocal.rol.toLowerCase() : "vendedor"
};

// Esto actualizará el texto en la parte superior del dashboard
const badgeRol = document.querySelector('#rol-badge');
if (badgeRol) {
    badgeRol.textContent = `Rol: ${usuarioActual.rol.toUpperCase()}`;
    // Opcional: Cambiar color del badge si es admin
    if (usuarioActual.rol === 'admin') {
        badgeRol.classList.replace('badge-info', 'badge-danger');
    }
}
});

// evento click: Controla que no se envíen campos vacíos
btnLogin.addEventListener("click", () => {
    let dataForm = getData();
    if (dataForm) { 
        senData(dataForm);
    }
});

// función para extraer datos: Mantiene los nombres de tu API (usuario/contrasena)
let getData = () => {
    if (userInput.value && passInput.value) {
        return {
            usuario: userInput.value,
            contrasena: passInput.value
        };
    } else {
        alert("El usuario y la contraseña son obligatorios");
        return null; 
    }
}

// función de envío: Solo guarda si el servidor da luz verde
let senData = async (data) => {
    let url = "http://localhost:3000/api/login";
    
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        let userLogin = await respuesta.json();

        // LÓGICA DE PERSISTENCIA: Solo guardo si NO hubo error 401
        if (respuesta.ok) {
            // Guardo el objeto completo (incluyendo usuario y contraseña para recordar)
            // Agrego los datos del formulario al objeto de respuesta
            const sessionData = { ...userLogin, ...data };
            
            localStorage.setItem("usuarioSesion", JSON.stringify(sessionData));
            
            console.log("Acceso exitoso. Datos recordados para la próxima.");
            alert("¡Bienvenido! Sesión iniciada y guardada.");
            
            // Aquí podrías redirigir al dashboard: window.location.href = "dashboard.html";
        } else {
            // Si hay error 401, aviso al usuario y no guardo nada nuevo
            alert("Error: Credenciales no válidas.");
        }

    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Servidor fuera de línea.");
    }
};