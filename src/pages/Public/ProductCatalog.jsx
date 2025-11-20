import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/apiService';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

export function ProductCatalog() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchProds() {
            try {
                const data = await getProducts(0, 50); // Traemos 50 productos
                setProductos(data.content || data);
            } catch (error) {
                console.error(error);
                toast.error("Error cargando catálogo");
            } finally {
                setLoading(false);
            }
        }
        fetchProds();
    }, []);

    const handleAgregar = (prod) => {
        addToCart({ ...prod, cantidad: 1 });
        toast.success(`Añadido: ${prod.nombre}`);
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-light"></div></div>;

    return (
        <div className="container fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white mb-0"><i className="bi bi-grid-fill text-info"></i> Catálogo Completo</h2>
                <span className="text-white-50">{productos.length} productos disponibles</span>
            </div>

            <div className="row">
                {productos.map(prod => (
                    <div key={prod.id} className="col-md-3 mb-4">
                        {/* Tarjeta Oscura */}
                        <div className="card h-100 border-0 shadow" style={{ backgroundColor: '#1e293b' }}>
                            <div className="position-relative">
                                <img 
                                    src={prod.imagen ? `http://localhost:8080/api/uploads/${prod.imagen}` : 'https://via.placeholder.com/300'} 
                                    className="card-img-top" 
                                    alt={prod.nombre}
                                    style={{ height: '220px', objectFit: 'cover', borderBottom: '1px solid rgba(255,255,255,0.1)' }} 
                                />
                                {!prod.activo && (
                                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                                         style={{backgroundColor: 'rgba(0,0,0,0.6)'}}>
                                        <span className="badge bg-secondary fs-6">Agotado</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="card-body text-white d-flex flex-column">
                                <h5 className="card-title text-truncate" title={prod.nombre}>{prod.nombre}</h5>
                                <p className="card-text small text-white-50 flex-grow-1">
                                    {prod.descripcion ? prod.descripcion.substring(0, 50) + '...' : 'Sin descripción'}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="fs-5 fw-bold text-warning">${prod.precio.toLocaleString()}</span>
                                    <button 
                                        onClick={() => handleAgregar(prod)} 
                                        className="btn btn-primary btn-sm fw-bold"
                                        disabled={!prod.activo}
                                    >
                                        <i className="bi bi-cart-plus"></i> Añadir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}