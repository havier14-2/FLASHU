import { Outlet } from 'react-router-dom';
// Importamos la Navbar. Asegúrate de que esta ruta coincida con donde guardaste tu PublicNavbar
import { PublicNavbar } from './PublicNavbar/PublicNavbar'; 

export function PublicLayout() {
    return (
        <div style={{ 
            // Fondo degradado oscuro fijo para toda la app
            background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            color: '#f1f5f9'
        }}>
            {/* Navbar fija arriba */}
            <PublicNavbar />
            
            {/* Contenedor principal: marginTop compensa la navbar fixed */}
            <div style={{ marginTop: '90px', flex: 1, paddingBottom: '50px' }} className="fade-in">
                <Outlet />
            </div>
            
            {/* Footer */}
            <footer style={{
                backgroundColor: '#020617', 
                borderTop: '1px solid rgba(255,255,255,0.05)',
                color: '#64748b',
                textAlign: 'center',
                padding: '2rem 0',
                marginTop: 'auto'
            }}>
                <div className="container">
                    <p className="mb-1">&copy; 2025 <strong>FLASHU</strong>. Tecnología Premium.</p>
                    <small>Desarrollado con Spring Boot & React</small>
                </div>
            </footer>
        </div>
    );
}