import { useState, useEffect } from 'react';
import './DashboardPage.css';
import { getProducts, getUsers } from '../../services/apiService';
import toast from 'react-hot-toast';

export function DashboardPage() {
    const [stats, setStats] = useState({ productCount: 0, userCount: 0 });
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [productsPage, usersData, lowStockPage] = await Promise.all([
                    getProducts(0, 1), // Pedimos solo 1 para obtener el total de elementos
                    getUsers(),
                    getProducts(0, 5, '', null, 5) // Pedimos productos con stock < 5
                ]);
                
                setStats({
                    productCount: productsPage.totalElements,
                    userCount: usersData.length,
                });
                
                setLowStockProducts(lowStockPage.content);

            } catch (error) {
                toast.error("No se pudieron cargar los datos del dashboard.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <p>Cargando datos del dashboard...</p>;
    }
    
    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div>
            <h2>Panel Administrativo</h2>
            <hr className="mb-4" />

            {/* --- SECCIÓN DE TARJETAS (AÑADIDA DE NUEVO) --- */}
            <h4>Estadísticas Básicas</h4>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="dashboard-card text-center">
                        <div className="card-icon"><i className="bi bi-box-seam"></i></div>
                        <h5 className="card-title">Productos en Inventario</h5>
                        <p className="card-value">{stats.productCount}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="dashboard-card text-center">
                        <div className="card-icon"><i className="bi bi-people"></i></div>
                        <h5 className="card-title">Usuarios Registrados</h5>
                        <p className="card-value">{stats.userCount}</p>
                    </div>
                </div>
            </div>
            {/* --- FIN DE LA SECCIÓN DE TARJETAS --- */}

            <h4 className="mt-5">Alertas de Stock Crítico (menos de 5 unidades)</h4>
            {lowStockProducts.length > 0 ? (
                <div className="alert alert-warning">
                    <ul className="list-unstyled mb-0">
                        {lowStockProducts.map(product => (
                            <li key={product.id}>
                                <strong>{product.nombre}</strong> - solo quedan {product.stock} unidades.
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="alert alert-success">
                    No hay productos con stock crítico.
                </div>
            )}
        </div>
    );
}