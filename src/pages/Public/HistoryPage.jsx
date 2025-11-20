import { useEffect, useState } from 'react';
import { getMyPurchases } from '../../services/apiService';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export function HistoryPage() {
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const data = await getMyPurchases();
                // Si el backend devuelve un error o no es array, protegemos el código
                if (Array.isArray(data)) {
                    setCompras(data.reverse()); // Ordenar por fecha (más reciente primero)
                }
            } catch (error) {
                console.error(error);
                toast.error("No se pudo cargar el historial");
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-warning"></div></div>;

    if (compras.length === 0) {
        return (
            <div className="container text-center mt-5 fade-in">
                <div className="p-5 rounded-4" style={{backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)'}}>
                    <i className="bi bi-bag-x text-secondary display-1"></i>
                    <h2 className="text-white mt-3">Aún no tienes compras</h2>
                    <p className="text-white-50">¡Es hora de estrenar tu historial!</p>
                    <Link to="/catalogo" className="btn btn-warning fw-bold mt-3">Ir al Catálogo</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5 fade-in">
            <h2 className="text-white mb-4"><i className="bi bi-clock-history text-info"></i> Historial de Compras</h2>
            
            <div className="table-responsive rounded-4 shadow-lg" style={{backgroundColor: '#1e293b'}}>
                <table className="table table-dark table-hover mb-0 align-middle" style={{backgroundColor: 'transparent'}}>
                    <thead className="text-uppercase text-secondary" style={{backgroundColor: '#0f172a'}}>
                        <tr>
                            <th className="py-3 ps-4">ID Orden</th>
                            <th className="py-3">Fecha</th>
                            <th className="py-3">Detalle</th>
                            <th className="py-3">Estado</th>
                            <th className="py-3 text-end pe-4">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map((venta) => (
                            <tr key={venta.id} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                                <td className="ps-4 fw-bold text-white">#{venta.id}</td>
                                <td className="text-white-50">
                                    {/* Formato de fecha amigable */}
                                    {new Date(venta.fecha).toLocaleDateString()} <small>{new Date(venta.fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                                </td>
                                <td className="text-white">
                                    {/* Mostrar resumen de items si existen detalles */}
                                    {venta.detalles && venta.detalles.length > 0 ? (
                                        <span className="small">
                                            {venta.detalles.length} productos 
                                            <span className="text-white-50 ms-1">
                                                ({venta.detalles[0].producto?.nombre || 'Producto'}...)
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="badge bg-dark border border-secondary">
                                            {venta.cantidadItems ? `${venta.cantidadItems} items` : 'Sin detalle'}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <span className="badge bg-success bg-opacity-25 text-success border border-success px-3">
                                        {venta.estado || 'Pagado'}
                                    </span>
                                </td>
                                <td className="text-end pe-4 fw-bold text-warning">
                                    ${venta.total.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}