import { useState } from 'react';
import { Navigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Footer } from '../Footer/Footer'; // <-- LÍNEA CORREGIDA (CON LLAVES)
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

    return (
        <div className="admin-layout">
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3 className="sidebar-title">FLASHU</h3>
                </div>
                <nav className="sidebar-nav">
                    <NavLink to="/dashboard" onClick={() => setSidebarOpen(false)}>
                        <i className="bi bi-grid-1x2-fill"></i>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/products" onClick={() => setSidebarOpen(false)}>
                        <i className="bi bi-box-seam-fill"></i>
                        <span>Productos</span>
                    </NavLink>
                    <NavLink to="/users" onClick={() => setSidebarOpen(false)}>
                        <i className="bi bi-people-fill"></i>
                        <span>Usuarios</span>
                    </NavLink>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={logout} className="logout-button">
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