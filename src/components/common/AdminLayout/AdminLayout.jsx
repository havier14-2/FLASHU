import { useState } from 'react';
import { Navigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Footer } from '../Footer/Footer';
import './AdminLayout.css';

export function AdminLayout() {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Función auxiliar para cerrar el menú al hacer clic en un enlace
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="admin-layout">
            {/* Overlay oscuro para móviles cuando el menú está abierto */}
            {isSidebarOpen && (
                <div 
                    className="sidebar-overlay" 
                    onClick={closeSidebar}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999
                    }}
                ></div>
            )}

            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3 className="sidebar-title">FLASHU Admin</h3>
                    {/* Botón X para cerrar en móviles */}
                    <button className="btn-close d-lg-none ms-auto" onClick={closeSidebar}></button>
                </div>
                
                <nav className="sidebar-nav">
                    <NavLink to="/dashboard" onClick={closeSidebar}>
                        <i className="bi bi-grid-1x2-fill"></i>
                        <span>Dashboard</span>
                    </NavLink>
                    
                    <NavLink to="/products" onClick={closeSidebar}>
                        <i className="bi bi-box-seam-fill"></i>
                        <span>Productos</span>
                    </NavLink>
                    
                    <NavLink to="/users" onClick={closeSidebar}>
                        <i className="bi bi-people-fill"></i>
                        <span>Usuarios</span>
                    </NavLink>

                    {/* --- ENLACE NUEVO: Registro de Ventas --- */}
                    <NavLink to="/ventas-admin" onClick={closeSidebar}>
                        <i className="bi bi-receipt"></i>
                        <span>Ventas</span>
                    </NavLink>

                    <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '1rem' }} />

                    {/* Enlace a la Tienda */}
                    <NavLink to="/" className="text-warning" onClick={closeSidebar}>
                        <i className="bi bi-shop"></i>
                        <span>Ver Tienda Online</span>
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={() => { closeSidebar(); logout(); }} className="logout-button">
                        <i className="bi bi-box-arrow-left"></i>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            <div className="main-content">
                <header className="main-header">
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        <i className="bi bi-list"></i>
                    </button>
                    <span className="header-user">Hola, {user.nombre || 'Admin'}</span>
                </header>
                
                <main className="content-area">
                    <Outlet />
                </main>
                
                <Footer />
            </div>
        </div>
    );
}