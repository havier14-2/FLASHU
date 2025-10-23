import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export function UserList({ users, regiones, onToggleStatus, onDelete }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter(user =>
            user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);
    
    const getRegionName = (regionId) => {
        if (!regiones || regiones.length === 0 || !regionId) return regionId || '-';
        const region = regiones.find(r => r.id == regionId);
        return region ? region.nombre : regionId;
    };

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
                        <th>Región</th>
                        <th>Comuna</th>
                        <th>Estado</th>
                        <th style={{ width: '150px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? filteredUsers.map(user => (
                        <tr key={user.id} style={{ opacity: user.estado === 'activo' ? 1 : 0.6 }}>
                            <td data-label="ID">{user.id}</td>
                            <td data-label="Nombre">{user.nombre}</td>
                            <td data-label="Email">{user.email}</td>
                            <td data-label="Rol">{user.rol}</td>
                            <td data-label="Región">{getRegionName(user.region)}</td>
                            <td data-label="Comuna">{user.comuna || '-'}</td>
                            <td data-label="Estado">
                                <span className={`badge ${user.estado === 'activo' ? 'bg-success' : 'bg-secondary'}`}>
                                    {user.estado}
                                </span>
                            </td>
                            <td data-label="Acciones" className="action-buttons">
                                <Link to={`/users/edit/${user.id}`} title="Editar">
                                    <i className="bi bi-pencil-fill"></i>
                                </Link>
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
                        <tr><td colSpan="8" className="text-center p-4">No se encontraron usuarios.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}