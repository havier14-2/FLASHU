import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/apiService';

export function UserForm() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ nombre: '', email: '', contrasena: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await createUser(user);
            alert('Usuario creado con éxito');
            navigate('/users');
        } catch (err) {
            setError(err.message || 'Error al crear el usuario.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-header"><h3>Crear Nuevo Usuario</h3></div>
            <div className="form-body">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" value={user.nombre} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input type="password" name="contrasena" value={user.contrasena} onChange={handleChange} className="form-control" required />
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
            <div className="form-actions">
                <button type="button" onClick={() => navigate('/users')} className="btn btn-secondary" disabled={loading}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Usuario'}
                </button>
            </div>
        </form>
    );
}