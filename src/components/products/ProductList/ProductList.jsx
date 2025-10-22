import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

export function ProductList({ page, filters, setFilters, categories, onPageChange, onToggleStatus, onDelete, loading }) {

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Usamos el useEffect de la página padre para recargar, así que aquí no es necesario onPageChange(0)

    return (
        <div className="table-container">
            <div className="table-header">
                <h3>Inventario de Productos</h3>
                <Link to="/products/create" className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>Crear Producto
                </Link>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-8">
                    <input type="text" name="nombre" className="form-control" placeholder="Buscar por nombre..."
                        value={filters.nombre} onChange={handleFilterChange} />
                </div>
                <div className="col-md-4">
                    <select name="categoriaId" className="form-select" value={filters.categoriaId} onChange={handleFilterChange}>
                        <option value="">Todas las categorías</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="table-responsive">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Imagen</th>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th style={{ width: '150px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" className="text-center p-4">Cargando...</td></tr>
                        ) : page.content && page.content.length > 0 ? page.content.map(prod => (
                            <tr key={prod.id} style={{ opacity: prod.activo ? 1 : 0.6 }}>
                                <td>
                                    {prod.imagen ? (
                                        <img src={`http://localhost:8080/api/uploads/${prod.imagen}`} alt={prod.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                                    ) : (
                                        <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="bi bi-card-image" style={{ fontSize: '1.5rem', color: '#ccc' }}></i>
                                        </div>
                                    )}
                                </td>
                                <td>{prod.id}</td>
                                <td>{prod.nombre}</td>
                                
                                {/* --- LÍNEA CORREGIDA --- */}
                                <td>${(prod.precio || 0).toLocaleString('es-CL')}</td>
                                
                                <td>{prod.stock || 0}</td>
                                <td>
                                    <span className={`badge ${prod.activo ? 'bg-success' : 'bg-secondary'}`}>
                                        {prod.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="action-buttons">
                                    <Link to={`/products/edit/${prod.id}`} title="Editar" className={!prod.activo ? 'disabled' : ''}>
                                        <i className="bi bi-pencil-fill"></i>
                                    </Link>
                                    {prod.activo ? (
                                        <button onClick={() => onToggleStatus(prod)} title="Desactivar">
                                            <i className="bi bi-toggle-on" style={{ color: 'green' }}></i>
                                        </button>
                                    ) : (
                                        <button onClick={() => onToggleStatus(prod)} title="Activar">
                                            <i className="bi bi-toggle-off" style={{ color: 'var(--color-texto-secundario)' }}></i>
                                        </button>
                                    )}
                                    <button onClick={() => onDelete(prod)} title="Eliminar Permanentemente">
                                        <i className="bi bi-trash-fill" style={{ color: 'red' }}></i>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="7" className="text-center p-4">No se encontraron productos.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <span>Página {page.number + 1} de {page.totalPages}</span>
                <div className="btn-group">
                    <button onClick={() => onPageChange(page.number - 1)} disabled={page.first || loading} className="btn btn-outline-secondary">
                        Anterior
                    </button>
                    <button onClick={() => onPageChange(page.number + 1)} disabled={page.last || loading} className="btn btn-outline-secondary">
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}