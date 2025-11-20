import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Funcionalidad JS (Menú hamburguesa, dropdowns)
import 'bootstrap-icons/font/bootstrap-icons.css'; // Iconos
import App from './App.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);