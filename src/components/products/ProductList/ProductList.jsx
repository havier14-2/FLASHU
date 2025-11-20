import { Link } from 'react-router-dom';

export function ProductList({ page, filters, setFilters, categories, onPageChange, onToggleStatus, onDelete, loading }) {

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1 text-white">Inventario</h2>
                    <p className="text-secondary m-0">Gestiona el catálogo de productos visibles.</p>
                </div>
                <Link to="/products/create" className="btn btn-success fw-bold shadow-sm">
                    <i className="bi bi-plus-lg me-2"></i>Nuevo Producto
                </Link>
            </div>

            {/* Filtros Oscuros */}
            <div className="row g-3 mb-4 p-3 rounded-3" style={{backgroundColor: '#1e293b'}}>
                <div className="col-md-8">
                    <input type="text" name="nombre" className="form-control bg-dark text-white border-secondary" placeholder="Buscar producto..."
                        value={filters.nombre} onChange={handleFilterChange} />
                </div>
                <div className="col-md-4">
                    <select name="categoriaId" className="form-select bg-dark text-white border-secondary" value={filters.categoriaId} onChange={handleFilterChange}>
                        <option value="">Todas las categorías</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="table-responsive shadow-lg rounded-3">
                <table className="table table-dark-custom w-100 mb-0">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Img</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="text-center p-5"><div className="spinner-border text-light"></div></td></tr>
                        ) : page.content && page.content.length > 0 ? page.content.map(prod => (
                            <tr key={prod.id} style={{ opacity: prod.activo ? 1 : 0.5 }}>
                                <td>
                                    <img 
                                        src={prod.imagen ? `http://localhost:8080/api/uploads/${prod.imagen}` : 'https://via.placeholder.com/50'} 
                                        alt="mini" 
                                        className="rounded border border-secondary"
                                        style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                                    />
                                </td>
                                <td>
                                    <div className="fw-bold text-white">{prod.nombre}</div>
                                    <div className="small text-secondary text-truncate" style={{maxWidth: '200px'}}>{prod.descripcion}</div>
                                </td>
                                <td className="text-warning fw-bold">${(prod.precio || 0).toLocaleString('es-CL')}</td>
                                <td>
                                    {prod.stock < 5 ? (
                                        <span className="text-danger fw-bold"><i className="bi bi-exclamation-circle"></i> {prod.stock}</span>
                                    ) : (
                                        <span className="text-success">{prod.stock}</span>
                                    )}
                                </td>
                                <td>
                                    <span className={`badge ${prod.activo ? 'bg-success' : 'bg-secondary'}`}>
                                        {prod.activo ? 'Visible' : 'Oculto'}
                                    </span>
                                </td>
                                <td className="text-end">
                                    <Link to={`/products/edit/${prod.id}`} className="btn-icon btn-edit" title="Editar">
                                        <i className="bi bi-pencil-fill"></i>
                                    </Link>
                                    
                                    <button onClick={() => onToggleStatus(prod)} 
                                            className={`btn-icon btn-toggle ${!prod.activo ? 'off' : ''}`}
                                            title={prod.activo ? 'Ocultar' : 'Mostrar'}>
                                        <i className={`bi ${prod.activo ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                                    </button>

                                    <button onClick={() => onDelete(prod)} className="btn-icon btn-delete" title="Eliminar">
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" className="text-center p-5 text-secondary">No hay productos.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación Simple */}
            <div className="d-flex justify-content-between align-items-center mt-4">
                <span className="text-secondary">Página {page.number + 1} de {page.totalPages}</span>
                <div className="btn-group">
                    <button onClick={() => onPageChange(page.number - 1)} disabled={page.first || loading} className="btn btn-outline-secondary btn-sm">Anterior</button>
                    <button onClick={() => onPageChange(page.number + 1)} disabled={page.last || loading} className="btn btn-outline-secondary btn-sm">Siguiente</button>
                </div>
            </div>
        </div>
    );
}