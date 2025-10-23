# FLASHU - Panel de Administración Full-Stack 🏪

¡Bienvenido al panel de administración de FLASHU! Este proyecto es una aplicación web completa (*full-stack*) diseñada para la gestión interna de una tienda virtual, permitiendo administrar productos, usuarios y categorías de forma eficiente.

---

## 📜 Descripción del Proyecto

Este sistema provee una interfaz de administrador segura y *responsive* para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las entidades principales de una tienda. Cuenta con un backend robusto construido con Spring Boot y un frontend moderno y dinámico desarrollado con React.

---

## ✨ Tecnologías Utilizadas

| Backend (Spring Boot)        | Frontend (React)              |
| :--------------------------- | :---------------------------- |
| ☕ Java 21                   | ⚛️ React 18                   |
| 🌱 Spring Boot 3             | ⚡ Vite                        |
| 🔐 Spring Security           | 🔄 React Router DOM           |
| 🗃️ Spring Data JPA & Hibernate | 📝 React Hook Form            |
| 🐬 MySQL                    | 🔥 React Hot Toast            |
| 📄 SpringDoc OpenAPI (Swagger) | 💅 Bootstrap 5 & Icons        |
| 🧪 JUnit & Mockito           | 🌐 Fetch API                  |
| 📦 Maven                     |                               |

---

## 📋 Prerrequisitos

Antes de empezar, asegúrate de tener instalado el siguiente software:
* **Java JDK 21** o superior.
* **Node.js** (que incluye npm).
* Un gestor de base de datos como **XAMPP** o **MySQL Workbench**.
* Tu IDE de preferencia, como **Visual Studio Code** con las extensiones recomendadas:
    * `Extension Pack for Java`
    * `Spring Boot Extension Pack`

---

## 🚀 Instalación y Configuración

Sigue estos pasos para configurar el entorno de desarrollo local.

### **1. Obtener el Código Fuente**
* Descarga el proyecto completo (frontend, backend y script de la base de datos) como un archivo ZIP desde la rama `main` del repositorio de GitHub.

### **2. Configuración del Backend y Base de Datos**
1.  **Inicia tu servidor de base de datos:** Abre **XAMPP** y activa los módulos de Apache y MySQL.
2.  **Crea la base de datos:** Usando una herramienta como MySQL Workbench o phpMyAdmin, importa y ejecuta el script **`BASEFLASHU.sql`** para crear la estructura de la base de datos y los datos iniciales.
3.  **Configura la conexión:** Abre la carpeta del backend y asegúrate de que el archivo `src/main/resources/application.properties` tenga las credenciales correctas para tu base de datos local.

### **3. Configuración del Frontend**
1.  Abre una terminal y navega hasta la carpeta del proyecto frontend.
2.  Instala todas las dependencias necesarias ejecutando el siguiente comando:
    ```bash
    npm install
    ```

---

## 🏁 Ejecución del Proyecto

### **1. Iniciar el Backend**
* Abre la carpeta del backend en **Visual Studio Code**.
* Utiliza la extensión de Spring Boot para iniciar el proyecto. Lo encontrarás en el **Spring Boot Dashboard**.
* El servidor se ejecutará en `http://localhost:8080`.

### **2. Iniciar el Frontend**
* En la terminal, dentro de la carpeta del frontend, ejecuta el siguiente comando:
    ```bash
    npm run dev
    ```
* La aplicación estará disponible en `http://localhost:5173` (o la URL que indique Vite en tu terminal).

---

## 🔑 Credenciales de Prueba

Para acceder al panel de administración, utiliza las siguientes credenciales:

-   **Email:** `profevivi@flashu.cl`
-   **Contraseña:** `ProfeVivi123!`

---

## 📚 Documentación de la API (Swagger)

La API del backend está completamente documentada con Swagger UI. Una vez que el servidor del backend esté corriendo, puedes acceder a la documentación interactiva en:

[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)