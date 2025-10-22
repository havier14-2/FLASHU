import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export function UserList({ users, onToggleStatus, onDelete }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter(user =>
            user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    return (
        <div className="table-container">
            <div className="table-header">
                <h3>Gestión de Usuarios</h3>
                <Link to="/users/create" className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>Crear Usuario
                </Link>
            </div>
            <input type="text" className="form-control mb-4" placeholder="Buscar por nombre o email..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th style={{ width: '150px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? filteredUsers.map(user => (
                        <tr key={user.id} style={{ opacity: user.estado === 'activo' ? 1 : 0.6 }}>
                            <td>{user.id}</td>
                            <td>{user.nombre}</td>
                            <td>{user.email}</td>
                            <td>{user.rol}</td>
                            <td>
                                <span className={`badge ${user.estado === 'activo' ? 'bg-success' : 'bg-secondary'}`}>
                                    {user.estado}
                                </span>
                            </td>
                            <td className="action-buttons">
                                {user.estado === 'activo' ? (
                                    <button onClick={() => onToggleStatus(user)} title="Desactivar">
                                        <i className="bi bi-toggle-on" style={{color: 'green'}}></i>
                                    </button>
                                ) : (
                                    <button onClick={() => onToggleStatus(user)} title="Activar">
                                        <i className="bi bi-toggle-off" style={{color: 'var(--color-texto-secundario)'}}></i>
                                    </button>
                                )}
                                <button onClick={() => onDelete(user)} title="Eliminar Usuario">
                                    <i className="bi bi-trash-fill" style={{color: 'red'}}></i>
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="6" className="text-center p-4">No se encontraron usuarios.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}