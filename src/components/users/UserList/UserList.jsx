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
        if (!regiones || regiones.length === 0 || !regionId) return '-';
        
        // CAMBIO AQUÍ: Usamos 'id' en lugar de 'codigo' y '==' para comparar string con number
        const region = regiones.find(r => r.id == regionId);
        
        return region ? region.nombre : regionId; // Si no la encuentra, muestra el ID
    };

    return (
        <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1 text-white">Gestión de Usuarios</h2>
                    <p className="text-secondary m-0">Administra clientes y administradores del sistema.</p>
                </div>
                <Link to="/users/create" className="btn btn-primary fw-bold shadow-sm">
                    <i className="bi bi-person-plus-fill me-2"></i>Nuevo Usuario
                </Link>
            </div>

            {/* Buscador */}
            <div className="mb-4 position-relative">
                <input 
                    type="text" 
                    className="form-control form-control-lg bg-dark text-white border-secondary ps-5" 
                    placeholder="Buscar por nombre o correo..."
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    style={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                />
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
            </div>

            <div className="table-responsive shadow-lg rounded-3" style={{ backgroundColor: '#1e293b' }}>
                <table className="table table-dark-custom w-100 mb-0">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th>Ubicación</th>
                            <th>Estado</th>
                            <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle bg-dark border border-secondary d-flex justify-content-center align-items-center text-white me-3" 
                                             style={{width: '40px', height: '40px', fontSize: '1.2rem'}}>
                                            {user.nombre.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="fw-bold text-white">{user.nombre}</div>
                                            <div className="small text-secondary">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.rol === 'super-admin' 
                                        ? <span className="badge bg-warning text-dark border border-warning"><i className="bi bi-shield-lock-fill me-1"></i> Admin</span>
                                        : <span className="badge bg-info text-dark border border-info"><i className="bi bi-person-fill me-1"></i> Cliente</span>
                                    }
                                </td>
                                <td>
                                    <span className="d-block text-light">{getRegionName(user.region)}</span>
                                    <small className="text-white-50">{user.comuna || ''}</small>
                                </td>
                                <td>
                                    <span className={`badge ${user.estado === 'activo' ? 'bg-success' : 'bg-danger'}`}>
                                        {user.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="text-end">
                                    <Link to={`/users/edit/${user.id}`} className="btn-icon btn-edit" title="Editar">
                                        <i className="bi bi-pencil-fill"></i>
                                    </Link>
                                    
                                    <button 
                                        onClick={() => onToggleStatus(user)} 
                                        className={`btn-icon btn-toggle ${user.estado !== 'activo' ? 'off' : ''}`}
                                        title={user.estado === 'activo' ? 'Desactivar' : 'Activar'}
                                    >
                                        <i className={`bi ${user.estado === 'activo' ? 'bi-toggle-on' : 'bi-toggle-off'}`}></i>
                                    </button>

                                    <button onClick={() => onDelete(user)} className="btn-icon btn-delete" title="Eliminar">
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" className="text-center p-5 text-secondary">No se encontraron usuarios.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}