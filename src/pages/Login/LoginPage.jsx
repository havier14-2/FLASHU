import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

export function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState(''); // Estado inicial vacío
    const [contrasena, setContrasena] = useState(''); // Estado inicial vacío
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        // Esta línea es para verificar si la función se está llamando
        console.log('Botón presionado, iniciando handleSubmit...');
        
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login({ email, contrasena });
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión. Revisa tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <h3 className="login-title">Iniciar Sesión en FLASHU</h3>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="superadmin@flashu.cl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="contrasena"
                            placeholder="*********"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-primary btn-custom" disabled={loading}>
                            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                        </button>
                    </div>

                    {error && (
                        <div id="errores" className="mt-3 text-center">
                            <div>• {error}</div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}