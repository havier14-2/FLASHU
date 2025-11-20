import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/apiService';

export function HomePage() {
    const [novedades, setNovedades] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                // Pedimos productos para poblar el home
                const response = await getProducts(0, 20); 
                const lista = response.content || response;

                // Lógica simulada: Últimos 4 son novedades, Baratos son ofertas
                setNovedades(lista.slice(0, 4)); 
                setOfertas(lista.filter(p => p.precio < 50000).slice(0, 4));
            } catch (error) {
                console.error("Error cargando home", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-warning"></div></div>;

    return (
        <div className="container fade-in">
            {/* --- HERO BANNER --- */}
            <div className="p-5 mb-5 rounded-4 shadow-lg text-center text-white position-relative overflow-hidden" 
                 style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
                <div className="position-relative z-1">
                    <h1 className="display-4 fw-bold mb-3">Tecnología del Futuro Hoy</h1>
                    <p className="lead mb-4 text-white-50">Encuentra los mejores gadgets, componentes y accesorios con envío a todo Chile.</p>
                    <Link to="/catalogo" className="btn btn-light btn-lg fw-bold px-5 rounded-pill shadow-sm text-primary">
                        Explorar Catálogo
                    </Link>
                </div>
            </div>

            {/* --- NOVEDADES --- */}
            <h3 className="text-white mb-4 border-start border-4 border-warning ps-3">
                <i className="bi bi-stars text-warning"></i> Recién Llegados
            </h3>
            <div className="row mb-5">
                {novedades.map(prod => (
                    <div key={prod.id} className="col-md-3 mb-4">
                        <div className="card h-100 border-0 shadow-lg hover-card" style={{ backgroundColor: '#1e293b' }}>
                            <img 
                                src={prod.imagen ? `http://localhost:8080/api/uploads/${prod.imagen}` : 'https://via.placeholder.com/300'} 
                                className="card-img-top" style={{height: '200px', objectFit: 'cover', opacity: 0.9}} alt={prod.nombre} 
                            />
                            <div className="card-body text-white">
                                <h6 className="card-title text-truncate">{prod.nombre}</h6>
                                <p className="fw-bold text-warning mb-2">${prod.precio.toLocaleString()}</p>
                                <Link to="/catalogo" className="btn btn-sm btn-outline-light w-100">Ver Detalles</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- OFERTAS --- */}
            <h3 className="text-white mb-4 border-start border-4 border-danger ps-3">
                <i className="bi bi-fire text-danger"></i> Ofertas Flash
            </h3>
            <div className="row mb-5">
                {ofertas.map(prod => (
                    <div key={prod.id} className="col-md-3 mb-4">
                        <div className="card h-100 border border-danger" style={{ backgroundColor: '#1e293b' }}>
                            <div className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 small fw-bold rounded-start">HOT</div>
                            <img 
                                src={prod.imagen ? `http://localhost:8080/api/uploads/${prod.imagen}` : 'https://via.placeholder.com/300'} 
                                className="card-img-top" style={{height: '200px', objectFit: 'cover'}} alt={prod.nombre} 
                            />
                            <div className="card-body text-white">
                                <h6 className="card-title text-truncate">{prod.nombre}</h6>
                                <p className="fw-bold text-danger fs-5 mb-2">${prod.precio.toLocaleString()}</p>
                                <Link to="/catalogo" className="btn btn-danger btn-sm w-100">¡Lo quiero!</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}