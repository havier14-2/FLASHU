# FLASHU - Tienda Online & Panel Admin Full-Stack 🏪 ⚡

¡Bienvenido a **FLASHU**! Este proyecto es una solución de comercio electrónico completa (*Full-Stack*) que integra una **Tienda Pública** moderna para clientes y un **Panel de Administración** avanzado para la gestión del negocio.

---

## 📜 Descripción del Proyecto

El sistema está diseñado bajo una arquitectura segura y escalable, cumpliendo con estándares de la industria como autenticación **JWT**, encriptación **BCrypt** y separación de roles.

### 🚀 Funcionalidades Implementadas

1.  **Autenticación y Seguridad (Spring Security + JWT):**
    * Login seguro con generación de Token JWT.
    * Protección de rutas en Backend y Frontend.
    * Roles diferenciados: **Cliente** (Tienda) y **Super-Admin** (Dashboard).
    * Hashing de contraseñas con BCrypt para máxima seguridad.

2.  **Tienda Cliente:**
    * **Catálogo Público:** Visualización de productos con imágenes, precios y stock.
    * **Carrito de Compras:** Gestión de estado global, cálculos de totales y simulación de pago.
    * **Historial de Compras:** Registro persistente de órdenes realizadas con desglose de productos.
    * **Boleta Electrónica:** Generación visual de comprobante con cálculo automático de IVA (19%) y Neto.

3.  **Panel de Administración (Dashboard):**
    * Gestión CRUD completa de Productos (con subida de imágenes).
    * Gestión de Usuarios (Crear, Editar, Bloquear).
    * **Reporte de Ventas:** Visualización de todas las transacciones realizadas en la plataforma.
    * **Control de Stock:** Alertas visuales de stock crítico.

---

## ✨ Tecnologías Utilizadas

| Backend (Spring Boot)        | Frontend (React)              |
| :--------------------------- | :---------------------------- |
| ☕ Java 21                   | ⚛️ React 18                   |
| 🌱 Spring Boot 3             | ⚡ Vite                        |
| 🔐 Spring Security + JWT     | 🔄 React Router DOM           |
| 🗃️ Spring Data JPA & MySQL   | 📝 React Hook Form            |
| 🐬 MySQL Driver              | 🔥 React Hot Toast            |
| 📄 Lombok & Validation       | 💅 Bootstrap 5 & Icons        |
| 🧪 JUnit & Mockito           | 🌐 Context API & LocalStorage |
| 📦 Maven                     | 🧪 Vitest & Testing Library   |

---

## 📋 Prerrequisitos

Antes de empezar, asegúrate de tener instalado el siguiente software:
* **Java JDK 21** o superior.
* **Node.js** (v18+ recomendado).
* Un gestor de base de datos como **XAMPP** (MySQL) o **MySQL Workbench**.
* Tu IDE de preferencia (VS Code, IntelliJ IDEA).

---

## 🚀 Instalación y Configuración

### **1. Obtener el Código Fuente**
Clona el repositorio y asegúrate de tener las dos carpetas principales: `backend` y `frontend`.

### **2. Configuración del Backend y Base de Datos**
1.  **Base de Datos:** Abre tu gestor SQL y crea una base de datos llamada `basesita` (o ajusta el nombre en `application.properties`).
2.  **Configuración:** En la carpeta `src/main/resources/application.properties`, verifica tus credenciales:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/tienda_db
    spring.datasource.username=root
    spring.datasource.password=
    ```
3.  **Inicialización:** Al correr la aplicación por primera vez, Hibernate creará las tablas automáticamente. Puedes usar el script para poblar la base de datos.

### **3. Configuración del Frontend**
1.  Abre una terminal en la carpeta del frontend (`FLASHU`).
2.  Instala las dependencias:
    ```bash
    npm install
    ```

---

## 🏁 Ejecución del Proyecto

### **1. Iniciar el Backend**
* Ejecuta la clase principal `BackEndTiendaApplication.java`.
* El servidor iniciará en `http://localhost:8080`.
* **Nota:** El backend cuenta con un "Seeder" que creará usuarios por defecto si la base de datos está vacía.

### **2. Iniciar el Frontend**
* En la terminal del frontend:
    ```bash
    npm run dev
    ```
* Accede a la tienda en `http://localhost:5173`.

---

## 🧪 Ejecución de Tests (FrontEnd)

El proyecto cuenta con una suite de pruebas unitarias y de integración para componentes críticos (Login, Carrito, Navbar).

### Para correr los tests en consola:
```bash
npm run test

```

### 🎨 Para abrir la Interfaz Visual (UI) de Vitest:
```bash
    npm run dev:ui

```

### 🔑 Credenciales de Prueba
El sistema viene pre-cargado con estos usuarios para facilitar la corrección y pruebas:
| Rol | Email | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | admin@flashu.cl | admin123 |
| **Cliente** | cliente@flashu.cl | cliente123 |
| **Profesora** | profevivi@flashu.cl | profe123 |

### 📚 Documentación API
El backend expone documentación Swagger para probar los 
endpoints directamente. Una vez iniciado el servidor, 
accede en:

👉 http://localhost:8080/swagger-ui.html

Tutorial Tienda: https://drive.google.com/drive/folders/1ACtEq4bYuRBXv_NOIL-UXyduUN2PTnH0?usp=drive_link

