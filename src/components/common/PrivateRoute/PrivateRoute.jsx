import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Navbar } from '../Navbar/Navbar'; // Asumimos que la Navbar se muestra en rutas privadas

export function PrivateRoute() {
    const { user } = useAuth();

    if (!user) {
        // Si no hay usuario, redirige a la página de login
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Navbar />
            <main className="container mt-4">
                <Outlet /> {/* Renderiza el componente de la ruta anidada */}
            </main>
        </>
    );
}