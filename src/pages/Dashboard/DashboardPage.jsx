import { useState, useEffect } from 'react';
import './DashboardPage.css';
import { getProducts, getUsers } from '../../services/apiService';
import toast from 'react-hot-toast';

export function DashboardPage() {
    const [stats, setStats] = useState({ productCount: 0, userCount: 0 });
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Hacemos las dos llamadas a la API al mismo tiempo
                const [productsPage, usersData] = await Promise.all([
                    getProducts(), // Pide la primera página de productos
                    getUsers()     // Pide todos los usuarios
                ]);
                
                // Leemos el número total de elementos del objeto de paginación
                setStats({
                    productCount: productsPage.totalElements,
                    userCount: usersData.length, // getUsers devuelve un array simple por ahora
                });
                
                // Filtramos los productos de la primera página para las alertas
                setLowStockProducts(productsPage.content.filter(p => p.activo && p.stock < 5));

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

    return (
        <div>
            <h2>Panel Administrativo</h2>
            <hr className="mb-4" />

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