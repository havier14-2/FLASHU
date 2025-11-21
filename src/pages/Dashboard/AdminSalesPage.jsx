import { useEffect, useState } from 'react';
import { getAllSales } from '../../services/apiService';
import toast from 'react-hot-toast';

export function AdminSalesPage() {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllSales()
            .then(data => setVentas(data.reverse())) // Las más nuevas primero
            .catch(() => toast.error("Error cargando ventas"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-5 text-white">Cargando registro...</div>;

    return (
        <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white fw-bold">Registro de Ventas</h2>
                <div className="bg-dark px-3 py-2 rounded text-warning fw-bold border border-warning">
                    Total Recaudado: ${ventas.reduce((acc, v) => acc + v.total, 0).toLocaleString()}
                </div>
            </div>

            <div className="table-responsive shadow-lg rounded-3" style={{ backgroundColor: '#1e293b' }}>
                <table className="table table-dark-custom w-100 mb-0">
                    <thead>
                        <tr>
                            <th># Boleta</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Items</th>
                            <th>Neto</th>
                            <th>IVA (19%)</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.id}>
                                <td className="text-white fw-bold">#{venta.id}</td>
                                <td className="text-secondary">
                                    {new Date(venta.fecha).toLocaleDateString()} <br/>
                                    <small>{new Date(venta.fecha).toLocaleTimeString()}</small>
                                </td>
                                <td>
                                    <div className="text-white">{venta.usuario?.nombre}</div>
                                    <small className="text-secondary">{venta.usuario?.email}</small>
                                </td>
                                <td className="text-center">
                                    <span className="badge bg-primary">{venta.cantidadItems}</span>
                                </td>
                                <td className="text-white-50">${venta.montoNeto?.toLocaleString()}</td>
                                <td className="text-white-50">${venta.montoIva?.toLocaleString()}</td>
                                <td className="text-warning fw-bold">${venta.total.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}