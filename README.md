# FLASHU - Panel de Administración Full-Stack 🏪

¡Bienvenido al panel de administración de FLASHU! Este proyecto es una aplicación web completa (full-stack) diseñada para la gestión interna de una tienda virtual, permitiendo administrar productos, usuarios y categorías de forma eficiente.



---
## 📜 Descripción del Proyecto

Este sistema provee una interfaz de administrador segura y responsive para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las entidades principales de una tienda. Cuenta con un backend robusto construido con Spring Boot y un frontend moderno y dinámico desarrollado con React.

---
## ✨ Tecnologías Utilizadas

| Backend (Spring Boot) | Frontend (React) |
| :--- | :--- |
| ☕ Java 21 | ⚛️ React 18 |
| 🌱 Spring Boot 3 | ⚡ Vite |
| 🔐 Spring Security | 🔄 React Router DOM |
| 🗃️ Spring Data JPA & Hibernate | 📝 React Hook Form |
| 🐬 MySQL | 🔥 React Hot Toast |
| 📄 SpringDoc OpenAPI (Swagger) | 💅 Bootstrap 5 & Bootstrap Icons |
| 🧪 JUnit & Mockito |  FETCH API |
| 📦 Maven | |

---
## 🚀 Instrucciones de Instalación

### **Backend (Spring Boot)**
1.  Clona el repositorio: `git clone https://github.com/tu-usuario/flashu-fullstack-app.git`
2.  Navega a la rama del backend: `git checkout backend`
3.  Configura tu base de datos MySQL en `src/main/resources/application.properties`.
4.  El proyecto está configurado para ejecutarse con Maven. Se construirán las dependencias automáticamente.

### **Frontend (React)**
1.  Clona el repositorio: `git clone https://github.com/tu-usuario/flashu-fullstack-app.git`
2.  Navega a la rama del frontend: `git checkout frontend`
3.  Instala las dependencias: `npm install`

---
## 🏁 Instrucciones de Ejecución

1.  **Ejecuta el Backend:** Abre el proyecto en tu IDE preferido y ejecuta la clase `BackEndTiendaApplication.java`. El servidor correrá en `http://localhost:8080`.
2.  **Ejecuta el Frontend:** En la carpeta del proyecto de React, ejecuta el comando `npm run dev`. La aplicación estará disponible en `http://localhost:5173`.

---
## 🔑 Credenciales de Prueba

Para acceder al panel de administración, utiliza las siguientes credenciales:

-   **Email:** `profevivi@flashu.cl`
-   **Contraseña:** `profevivi1`

---
## 📚 Documentación de la API (Swagger)

La API del backend está completamente documentada con Swagger UI. Una vez que el servidor del backend esté corriendo, puedes acceder a la documentación interactiva en la siguiente URL:

[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)