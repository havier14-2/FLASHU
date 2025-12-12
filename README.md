# ⚡ FLASHU - Sistema de Gestión de Recursos (ERP)

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-green)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Status](https://img.shields.io/badge/Status-Completed-success)

> **Una solución Full Stack integral para la gestión eficiente de inventarios, ventas y administración de usuarios.**

## 📖 Descripción del Proyecto

**FLASHU** es una aplicación web diseñada para digitalizar y optimizar los procesos operativos de pequeños y medianos negocios. El sistema permite a los administradores mantener un control preciso del stock en tiempo real, gestionar flujos de ventas y administrar roles de usuarios dentro de la organización.

El proyecto fue construido siguiendo una arquitectura **desacoplada (Frontend vs Backend)**, utilizando **Spring Boot** para proveer una API RESTful robusta y segura, y **React.js** para ofrecer una experiencia de usuario (SPA) moderna y reactiva.

---

## 🚀 Características Principales

* **Gestión de Inventario (CRUD):** Funcionalidad completa para crear, leer, actualizar y eliminar productos, asegurando la integridad de los datos de stock.
* **API RESTful Segura:** Diseño de endpoints estandarizados con manejo de códigos de estado HTTP y validaciones de entrada.
* **Autenticación y Seguridad:** Implementación de capas de seguridad para la gestión de usuarios y protección de rutas.
* **Base de Datos Relacional:** Modelo E-R optimizado en MySQL para soportar relaciones complejas entre ventas, productos y usuarios.
* **Arquitectura Escalable:** Estructura de código modular que facilita el mantenimiento y la adición de nuevas funcionalidades.

---

## 🛠️ Stack Tecnológico

### Backend (Servidor)
* **Lenguaje:** Java 17
* **Framework:** Spring Boot (Web, Data JPA, Security)
* **Base de Datos:** MySQL
* **Herramientas:** Maven, Postman (para pruebas de API)

### Frontend (Cliente)
* **Framework:** React.js
* **Estilos:** CSS3 / Diseño Responsivo
* **Conexión API:** Axios / Fetch
* **Gestión de Estado:** React Hooks

---

## ⚙️ Instalación y Configuración Local

Sigue estos pasos para correr el proyecto en tu máquina local.

### Prerrequisitos
* Java JDK 17+
* Node.js & npm
* MySQL Server

### 1. Configuración del Backend

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/havier14-2/FLASHU.git](https://github.com/havier14-2/FLASHU.git)
    ```
2.  Navega a la carpeta del servidor (ejemplo):
    ```bash
    cd FLASHU/backend
    ```
3.  Configura tu base de datos en `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/flashu_db
    spring.datasource.username=TU_USUARIO
    spring.datasource.password=TU_CONTRASEÑA
    ```
4.  Ejecuta la aplicación:
    ```bash
    ./mvnw spring-boot:run
    ```

### 2. Configuración del Frontend

1.  Navega a la carpeta del cliente:
    ```bash
    cd FLASHU/frontend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm start
    ```
4.  Abre tu navegador en `http://localhost:3000`.

---

## 🧠 Arquitectura del Proyecto

El sistema utiliza un patrón **MVC (Modelo-Vista-Controlador)** en el backend expuesto a través de una API REST.

* **Controller Layer:** Maneja las peticiones HTTP y define los endpoints accesibles.
* **Service Layer:** Contiene la lógica de negocio, cálculos y validaciones antes de persistir datos.
* **Repository Layer:** Interactúa directamente con la base de datos mediante abstracciones de Hibernate/JPA.


---
*Este proyecto es parte de mi portafolio profesional.*
