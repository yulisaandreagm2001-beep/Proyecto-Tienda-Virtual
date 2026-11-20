# 🛒 Tienda Virtual

Aplicación web full stack de tienda virtual con autenticación, roles de usuario y gestión de datos (CRUD), desarrollada en equipo.

## ✨ Funcionalidades

- Registro e inicio de sesión de usuarios
- Control de acceso por roles ([admin / cliente])
- CRUD de [productos / pedidos / usuarios]
- Filtros de búsqueda
- Redirección al dashboard según el rol
- Restricciones por rol en acciones como eliminar

## 🧰 Tecnologías

- **Backend:** Node.js · [Express]
- **Base de datos:** MySQL
- **Frontend:** [React + Vite]
- **Control de versiones:** Git y GitHub

## 📁 Estructura

```
Proyecto-Tienda-Virtual/
├── BACKEND_TIENDA_NODE_MYSQL/   # API y lógica del servidor
└── frontend/                    # Interfaz de usuario
```

## 🚀 Cómo ejecutarlo

### Requisitos
- Node.js
- MySQL instalado y en ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/yulisaandreagm2001-beep/Proyecto-Tienda-Virtual.git
cd Proyecto-Tienda-Virtual
```

### 2. Backend
```bash
cd BACKEND_TIENDA_NODE_MYSQL
npm install
```

Crea un archivo `.env` con los datos de conexión a tu base de datos:
```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_la_base
PORT=3000
```

Crea la base de datos en MySQL [e importa el script .sql, si existe] y ejecuta:
```bash
npm start
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 👥 Autoría

Proyecto desarrollado en equipo.

- **Yulisa Andrea Gómez Montoya:** backend (API en Node.js, base de datos MySQL, autenticación, roles, CRUD y filtros).
- **[Nombre del compañero(a)]:** frontend.

## 📬 Contacto

[LinkedIn](https://www.linkedin.com/in/yulisa-andrea-gomez-montoya/)
