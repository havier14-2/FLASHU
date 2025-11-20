import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import './LoginPage.css';

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const userData = await login({ email, contrasena });
            
            // DEBUG: Mira la consola (F12) para ver qué rol exacto está llegando
            console.log("Usuario logueado:", userData); 
            console.log("Rol detectado:", userData.rol);

            toast.success(`¡Bienvenido de nuevo!`);

            // LÓGICA DE REDIRECCIÓN MEJORADA
            // Convertimos a minúsculas y quitamos espacios para evitar errores
            const userRole = userData.rol ? userData.rol.toLowerCase().trim() : '';

            if (userRole === 'super-admin' || userRole === 'admin') {
                navigate('/dashboard'); // Admin al Dashboard
            } else {
                navigate('/'); // Clientes al Home
            }

        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Error al iniciar sesión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <div className="text-center mb-3">
                    <i className="bi bi-person-circle" style={{fontSize: '3rem', color: '#2c3e50'}}></i>
                </div>
                <h3 className="login-title">Iniciar Sesión</h3>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="nombre@ejemplo.com" 
                            disabled={loading} 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={contrasena} 
                            onChange={(e) => setContrasena(e.target.value)} 
                            placeholder="••••••••" 
                            disabled={loading} 
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-custom" disabled={loading}>
                            {loading ? 'Verificando...' : 'Ingresar'}
                        </button>
                    </div>

                    <Link to="/" className="back-link">
                        <i className="bi bi-arrow-left"></i> Volver a la tienda
                    </Link>
                </form>
            </div>
        </div>
    );
}