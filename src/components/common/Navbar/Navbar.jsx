import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';

export function Navbar() {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">FLASHU</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                        {/* Ahora Productos es solo el catálogo */}
                        <li className="nav-item"><Link className="nav-link" to="/productos">Catálogo</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/noticias">Noticias</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
                        
                        <li className="nav-item ms-2">
                            <Link className="nav-link position-relative" to="/carrito">
                                <i className="bi bi-cart-fill fs-5"></i>
                                {cart && cart.length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" style={{fontSize: '0.7rem'}}>
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        </li>

                        {user ? (
                            <>
                                <li className="nav-item ms-3 text-white small border-start ps-3 border-secondary">
                                    Hola, {user?.nombre ? user.nombre.split(' ')[0] : 'Cliente'}
                                </li>
                                {user.rol === 'super-admin' && (
                                    <li className="nav-item">
                                        <Link className="btn btn-outline-warning btn-sm ms-3" to="/dashboard">
                                            Admin Panel
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-link nav-link text-danger ms-2">Salir</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                                <Link className="btn btn-outline-light btn-sm px-3" to="/login">Iniciar Sesión</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}