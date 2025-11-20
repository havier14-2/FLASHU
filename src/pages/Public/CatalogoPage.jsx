import { useEffect, useState } from 'react';
import { getProducts } from '../../services/apiService';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

export function CatalogoPage() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        getProducts(0, 100)
            .then(data => {
                setProductos(data.content || []);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Error de conexión con el servidor");
                setLoading(false);
            });
    }, []);

    const handleAdd = (prod) => {
        addToCart(prod);
        toast.success(`${prod.nombre} agregado 🛒`, {
            style: { background: '#1e293b', color: '#fff' },
            iconTheme: { primary: '#fbbf24', secondary: '#fff' },
        });
    };

    if (loading) return <div className="text-center mt-5 text-white p-5"><h3><span className="spinner-border text-warning"></span> Cargando catálogo...</h3></div>;

    return (
        <div className="container">
            {/* Banner Hero */}
            <div className="text-center mb-5 p-5 rounded-4 position-relative overflow-hidden shadow-lg" 
                 style={{
                     background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                     border: '1px solid rgba(255,255,255,0.1)'
                 }}>
                <div className="position-relative z-1">
                    <h1 className="display-4 fw-bold text-white mb-2">Tienda <span className="text-warning">FLASHU</span></h1>
                    <p className="lead text-light opacity-75">Tecnología Premium</p>
                </div>
            </div>

            <div className="row g-4">
                {productos.map(prod => (
                    <div className="col-md-4 col-lg-3" key={prod.id}>
                        {/* Tarjeta */}
                        <div className="card h-100 border-0 shadow-sm" 
                             style={{
                                 backgroundColor: '#1e293b', // Fondo Slate 800 (Gris Azulado Oscuro)
                                 borderRadius: '16px',
                                 overflow: 'hidden',
                                 transition: 'transform 0.3s ease'
                             }}
                             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {/* Contenedor de Imagen Seguro */}
                            <div style={{ height: '220px', position: 'relative', backgroundColor: '#0f172a' }}>
                                {prod.imagen ? (
                                    <img 
                                        src={`http://localhost:8080/api/uploads/${prod.imagen}`} 
                                        alt={prod.nombre} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                            // SOLUCIÓN AL PARPADEO:
                                            // Si falla, ocultamos la imagen y mostramos el div de respaldo (hermano siguiente)
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex'; 
                                        }}
                                    />
                                ) : null}
                                
                                {/* Fallback: Se muestra si no hay imagen O si la imagen falla al cargar */}
                                <div style={{
                                    display: prod.imagen ? 'none' : 'flex', // Oculto por defecto si hay imagen
                                    width: '100%', 
                                    height: '100%', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    color: '#64748b'
                                }}>
                                    <i className="bi bi-image" style={{fontSize: '3rem', opacity: 0.5}}></i>
                                    <span style={{fontSize: '0.8rem', marginTop: '5px'}}>Sin Imagen</span>
                                </div>

                                {/* Badge Stock */}
                                {prod.stock <= 5 && prod.stock > 0 && (
                                    <span className="position-absolute top-0 end-0 m-2 badge bg-warning text-dark shadow">
                                        ¡Quedan {prod.stock}!
                                    </span>
                                )}
                            </div>

                            {/* Cuerpo de la Tarjeta */}
                            <div className="card-body d-flex flex-column p-3">
                                <h5 className="card-title fw-bold text-white fs-6 mb-2">{prod.nombre}</h5>
                                
                                {/* Descripción: Color corregido para que se lea (Gris claro #cbd5e1) */}
                                <p className="card-text flex-grow-1" style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                                    {prod.descripcion ? 
                                        (prod.descripcion.length > 50 ? prod.descripcion.substring(0, 50) + '...' : prod.descripcion) 
                                        : 'Sin descripción disponible.'}
                                </p>
                                
                                <div className="mt-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <div style={{fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase'}}>Precio</div>
                                        <div className="text-info fw-bold fs-5">${prod.precio.toLocaleString()}</div>
                                    </div>
                                    
                                    <button 
                                        className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center shadow"
                                        onClick={() => handleAdd(prod)}
                                        disabled={prod.stock <= 0}
                                        style={{ width: '45px', height: '45px', transition: 'all 0.2s' }}
                                        title="Agregar al carrito"
                                    >
                                        <i className={`bi ${prod.stock > 0 ? 'bi-cart-plus-fill fs-5' : 'bi-x-lg'}`}></i>
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