// ---Variables de Registro ---
const d = document;
const regUser = d.querySelector("#usuarioRegistro");
const regPass = d.querySelector("#contraRegistro");
const regRol = d.querySelector("#rolRegistro");
const btnRegister = d.querySelector("#btnRegister");

// Evento para capturar el click
btnRegister.addEventListener("click", () => {
    // Obtengo los datos validados del formulario
    let dataReg = getRegData();

    // Si los datos están completos, inicio la promesa de guardado
    if (dataReg) {
        saveUser(dataReg);
    }
});

// Función para validar y organizar la información
let getRegData = () => {
    // Verifico que el usuario haya llenado todo, incluyendo el rol
    if (regUser.value && regPass.value && regRol.value) {
        return {
            rol: regRol.value,
            usuario: regUser.value,
            contrasena: regPass.value
        };
    } else {
        alert("Por favor, completa todos los campos y selecciona un rol.");
        return null;
    }
};

// Función asíncrona para guardar en la base de datos MySQL vía Node.js
let saveUser = async (data) => {
    let url = "http://localhost:3000/api/usuarios";
    
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        let resultado = await respuesta.json();

        // Si el servidor crea el usuario correctamente (Status 201 o 200)
        if (respuesta.ok) {
            console.log("¡Usuario registrado!", resultado);
            alert("Registro exitoso. Ahora puedes iniciar sesión con tu nuevo perfil.");
            
            // Redirijo al login para probar la nueva cuenta
            window.location.href = "login.html";
        } else {
            alert("Error en el registro: El usuario ya existe o los datos son inválidos.");
        }

    } catch (error) {
        console.error("Error de conexión:", error);
        alert("No hay conexión con el servidor de registro.");
    }
};