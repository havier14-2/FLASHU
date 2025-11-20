import { useEffect, useState } from 'react';
import { getMisCompras } from '../../services/apiService';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export function MisComprasPage() {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarCompras();
    }, []);

    const cargarCompras = async () => {
        try {
            const data = await getMisCompras();
            setVentas(data);
        } catch (error) {
            console.error(error);
            toast.error("No se pudo cargar el historial");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container mt-5 text-center text-white"><h3><span className="spinner-border text-warning"></span> Cargando historial...</h3></div>;

    if (ventas.length === 0) {
        return (
            <div className="container mt-5 pt-5 text-center">
                <div className="p-5 rounded-4" style={{backgroundColor: '#1e293b', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'}}>
                    <i className="bi bi-receipt text-secondary" style={{fontSize: '4rem'}}></i>
                    <h2 className="text-white mt-3 fw-bold">Sin historial</h2>
                    <p className="text-muted">Aún no has realizado compras en FLASHU.</p>
                    <Link to="/catalogo" className="btn btn-info fw-bold px-4 mt-2 text-white">Ir a la tienda</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mb-5" style={{ marginTop: '100px' }}>
            <h2 className="mb-4 text-white fw-bold border-bottom border-secondary pb-2 d-inline-block">
                <i className="bi bi-clock-history text-warning me-2"></i> Mis Compras
            </h2>
            
            <div className="row">
                <div className="col-12">
                    {ventas.map((venta) => (
                        <div key={venta.id} className="card mb-4 border-0 shadow-lg" style={{backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden'}}>
                            {/* Cabecera de la Boleta */}
                            <div className="card-header border-0 d-flex justify-content-between align-items-center px-4 py-3" 
                                 style={{background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)'}}>
                                <div className="text-light">
                                    <span className="text-secondary small text-uppercase fw-bold">Boleta #</span>
                                    <span className="fs-5 fw-bold ms-1">{venta.id}</span>
                                    <span className="mx-2 text-secondary">|</span>
                                    <small className="text-info"><i className="bi bi-calendar3 me-1"></i> {new Date(venta.fecha).toLocaleString()}</small>
                                </div>
                                <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill">
                                    <i className="bi bi-check-circle-fill me-1"></i> Pagado
                                </span>
                            </div>

                            {/* Cuerpo con Detalles */}
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-dark table-hover mb-0 align-middle" style={{backgroundColor: 'transparent'}}>
                                        <thead style={{backgroundColor: '#0f172a'}}>
                                            <tr className="text-secondary text-uppercase small">
                                                <th className="px-4 py-3">Producto</th>
                                                <th className="text-center">Cant.</th>
                                                <th className="text-end">Precio Unit.</th>
                                                <th className="text-end px-4">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {venta.detalles.map((detalle) => (
                                                <tr key={detalle.id} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                                                    <td className="px-4 py-3">
                                                        <div className="d-flex align-items-center text-white fw-500">
                                                            <div style={{width:'40px', height:'40px', background:'#0f172a', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', marginRight:'12px'}}>
                                                                <i className="bi bi-box-seam text-muted"></i>
                                                            </div>
                                                            {detalle.producto.nombre}
                                                        </div>
                                                    </td>
                                                    <td className="text-center text-muted">{detalle.cantidad}</td>
                                                    <td className="text-end text-muted">${detalle.precioUnitario.toLocaleString()}</td>
                                                    <td className="text-end px-4 text-info fw-bold">${detalle.subtotal.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Footer con Total */}
                            <div className="card-footer border-top border-secondary border-opacity-10 p-4 text-end" style={{backgroundColor: '#162032'}}>
                                <p className="mb-0 text-secondary small text-uppercase">Total Pagado</p>
                                <h3 className="text-warning fw-bold m-0">${venta.total.toLocaleString()}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}