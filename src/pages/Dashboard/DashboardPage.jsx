import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getUsers } from '../../services/apiService';
import toast from 'react-hot-toast';

export function DashboardPage() {
    const [stats, setStats] = useState({ productCount: 0, userCount: 0 });
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [productsPage, usersData, lowStockPage] = await Promise.all([
                    getProducts(0, 1), // Solo para contar el total
                    getUsers(),
                    getProducts(0, 10, '', null, 5) // Traer hasta 10 productos con stock < 5
                ]);
                
                setStats({
                    productCount: productsPage.totalElements,
                    userCount: usersData.length,
                });
                
                setLowStockProducts(lowStockPage.content);

            } catch (error) {
                toast.error("Error cargando datos del dashboard.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-warning"></div></div>;

    return (
        <div className="fade-in">
            <h2 className="mb-4 text-white fw-bold">Panel de Control</h2>

            {/* --- TARJETAS DE ESTADÍSTICAS --- */}
            <div className="row g-4 mb-5">
                <div className="col-md-6">
                    <div className="card border-0 shadow-lg h-100" style={{ backgroundColor: '#1e293b', borderLeft: '5px solid #3b82f6' }}>
                        <div className="card-body d-flex align-items-center p-4">
                            <div className="rounded-circle bg-primary bg-opacity-25 p-3 me-3">
                                <i className="bi bi-box-seam-fill fs-2 text-primary"></i>
                            </div>
                            <div>
                                <h6 className="text-secondary mb-1 text-uppercase">Total Productos</h6>
                                <h2 className="text-white fw-bold m-0">{stats.productCount}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-0 shadow-lg h-100" style={{ backgroundColor: '#1e293b', borderLeft: '5px solid #10b981' }}>
                        <div className="card-body d-flex align-items-center p-4">
                            <div className="rounded-circle bg-success bg-opacity-25 p-3 me-3">
                                <i className="bi bi-people-fill fs-2 text-success"></i>
                            </div>
                            <div>
                                <h6 className="text-secondary mb-1 text-uppercase">Usuarios Registrados</h6>
                                <h2 className="text-white fw-bold m-0">{stats.userCount}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SECCIÓN STOCK CRÍTICO DETALLADA --- */}
            <div className="d-flex align-items-center mb-3">
                <div className="bg-danger rounded-circle p-2 me-2 d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                    <i className="bi bi-exclamation-triangle-fill text-white"></i>
                </div>
                <h4 className="text-white m-0 fw-bold">Alerta de Stock Crítico</h4>
            </div>

            <div className="table-responsive shadow-lg rounded-3" style={{ backgroundColor: '#1e293b' }}>
                <table className="table table-dark-custom w-100 mb-0">
                    <thead>
                        <tr>
                            <th style={{width: '80px'}}>Imagen</th>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock Actual</th>
                            <th className="text-end">Gestionar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lowStockProducts.length > 0 ? (
                            lowStockProducts.map(prod => (
                                <tr key={prod.id}>
                                    <td>
                                        <img 
                                            src={prod.imagen ? `http://localhost:8080/api/uploads/${prod.imagen}` : 'https://via.placeholder.com/50'} 
                                            alt="mini" 
                                            className="rounded border border-danger"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                        />
                                    </td>
                                    <td>
                                        <div className="fw-bold text-white">{prod.nombre}</div>
                                        <div className="small text-white-50 text-truncate" style={{maxWidth: '250px'}}>
                                            {prod.descripcion || 'Sin descripción'}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge bg-dark border border-secondary text-light">
                                            {prod.categoria?.nombre || 'General'}
                                        </span>
                                    </td>
                                    <td className="text-light">
                                        ${prod.precio.toLocaleString('es-CL')}
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <span className="badge bg-danger fs-6 me-2">{prod.stock}</span>
                                            <span className="text-danger small fw-bold">¡Crítico!</span>
                                        </div>
                                    </td>
                                    <td className="text-end">
                                        <Link 
                                            to={`/products/edit/${prod.id}`} 
                                            className="btn btn-sm btn-warning fw-bold"
                                            title="Reponer Stock"
                                        >
                                            <i className="bi bi-box-arrow-in-up me-1"></i> Reponer
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-5">
                                    <div className="text-success">
                                        <i className="bi bi-check-circle fs-1 d-block mb-2"></i>
                                        <h5>¡Todo en orden!</h5>
                                        <p className="mb-0">No hay productos con stock bajo.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}