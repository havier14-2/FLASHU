import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';

export function PublicNavbar() {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        closeMenu();
    };

    // Función para cerrar el menú en móviles
    const closeMenu = () => {
        const navbarCollapse = document.getElementById('navbarContent');
        if (navbarCollapse) {
            navbarCollapse.classList.remove('show');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-lg" 
             style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold text-warning" to="/" onClick={closeMenu} style={{ letterSpacing: '1px' }}>
                    <i className="bi bi-lightning-charge-fill"></i> FLASHU
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto align-items-center gap-3">
                        <li className="nav-item"><Link className="nav-link" to="/" onClick={closeMenu}>Inicio</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/catalogo" onClick={closeMenu}>Catálogo</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/noticias" onClick={closeMenu}>Noticias</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/nosotros" onClick={closeMenu}>Nosotros</Link></li>
                        
                        <li className="nav-item">
                            <Link className="btn btn-outline-warning position-relative border-0" to="/carrito" onClick={closeMenu}>
                                <i className="bi bi-cart3 fs-5"></i>
                                {cart && cart.length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        </li>

                        <div className="vr d-none d-lg-block text-secondary mx-2"></div>

                        {user ? (
                            <>
                                <li className="nav-item text-white small">
                                    <i className="bi bi-person-circle me-1"></i>
                                    {user?.nombre ? user.nombre.split(' ')[0] : 'Cliente'}
                                </li>

                                {/* --- BOTÓN NUEVO: MIS COMPRAS --- */}
                                <li className="nav-item">
                                    <Link className="nav-link text-info fw-bold" to="/mis-compras" onClick={closeMenu}>
                                        <i className="bi bi-bag-check-fill me-1"></i> Mis Compras
                                    </Link>
                                </li>

                                {user.rol === 'super-admin' && (
                                    <li className="nav-item">
                                        <Link className="btn btn-sm btn-warning text-dark fw-bold" to="/dashboard" onClick={closeMenu}>
                                            Admin
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-sm btn-link nav-link text-danger text-decoration-none">
                                        Salir
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="btn btn-sm btn-light fw-bold px-3" to="/login" onClick={closeMenu}>Ingresar</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}