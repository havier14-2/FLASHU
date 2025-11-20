import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createVenta } from '../../services/apiService';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function CarritoPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Estados para el modal
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);

    const costoEnvio = 4000;
    const totalFinal = total + (cart.length > 0 ? costoEnvio : 0);

    const handleOpenModal = () => {
        if (!user) {
            toast.error("Inicia sesión para pagar");
            navigate('/login');
            return;
        }
        setStep(1);
        setShowModal(true);
    };

    const handlePaySimulation = (e) => {
        e.preventDefault();
        setStep(2); // Cambiar a "Cargando"
        
        // Preparamos los datos EXACTOS que espera tu nuevo Backend Java
        const ventaData = {
            total: totalFinal,
            detalles: cart.map(item => ({
                producto: { id: item.id }, // Enviamos el objeto producto con su ID
                cantidad: item.cantidad,
                precioUnitario: item.precio
            }))
        };

        setTimeout(async () => {
            try {
                // Enviamos la venta con detalles al backend
                await createVenta(ventaData);
                
                setStep(3); // Cambiar a "Éxito"
                clearCart();
            } catch (error) {
                console.error("Error en venta:", error);
                toast.error("Error procesando el pago");
                setShowModal(false);
            }
        }, 2500);
    };

    const handleCloseSuccess = () => {
        setShowModal(false);
        navigate('/mis-compras'); // Redirigir al historial al terminar
    };

    // Si el carrito está vacío y no estamos viendo el mensaje de éxito
    if (cart.length === 0 && step !== 3) {
        return (
            <div className="container text-center mt-5 pt-5">
                <div className="p-5 rounded bg-white shadow-sm">
                    <i className="bi bi-cart-x display-1 text-muted"></i>
                    <h2 className="mt-3">Tu carrito está vacío</h2>
                    <p className="text-muted">Parece que aún no has añadido nada.</p>
                    <Link to="/catalogo" className="btn btn-primary mt-3">Ir al Catálogo</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mb-5" style={{ marginTop: '100px' }}>
            <h2 className="mb-4 text-white"><i className="bi bi-cart3"></i> Tu Carrito</h2>

            <div className="row">
                {/* Listado de productos */}
                <div className="col-lg-8">
                    {cart.map((item) => (
                        <div key={item.id} className="card mb-3 shadow-sm border-0" style={{ backgroundColor: '#1e293b' }}>
                            <div className="card-body d-flex align-items-center">
                                
                                {/* Imagen */}
                                <div className="flex-shrink-0">
                                    <img 
                                        src={item.imagen ? `http://localhost:8080/api/uploads/${item.imagen}` : 'https://via.placeholder.com/80'} 
                                        alt={item.nombre}
                                        style={{width: '90px', height: '90px', objectFit: 'cover', borderRadius: '10px'}}
                                    />
                                </div>

                                {/* Info del Producto */}
                                <div className="ms-3 flex-grow-1">
                                    <h5 className="mb-1 text-white">{item.nombre}</h5>
                                    <p className="mb-1 small" style={{ color: '#cbd5e1' }}>
                                        {item.descripcion ? 
                                            (item.descripcion.length > 60 ? item.descripcion.substring(0, 60) + '...' : item.descripcion)
                                            : 'Sin descripción.'
                                        }
                                    </p>
                                    <span className="fw-bold text-warning">${item.precio.toLocaleString()}</span>
                                </div>

                                {/* Controles */}
                                <div className="d-flex align-items-center">
                                    <input 
                                        type="number" 
                                        className="form-control text-center me-3" 
                                        style={{width: '70px', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white'}}
                                        value={item.cantidad}
                                        min="1"
                                        max={item.stock}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    />
                                    <button onClick={() => removeFromCart(item.id)} className="btn btn-outline-danger btn-sm">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen */}
                <div className="col-lg-4">
                    <div className="card shadow border-0 p-4 bg-white">
                        <h4 className="mb-3">Resumen</h4>
                        <div className="d-flex justify-content-between mb-2 text-secondary">
                            <span>Subtotal</span>
                            <span>${total.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 text-secondary">
                            <span>Envío</span>
                            <span>${costoEnvio.toLocaleString()}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-4 fs-5 fw-bold text-dark">
                            <span>Total</span>
                            <span>${totalFinal.toLocaleString()}</span>
                        </div>
                        <button onClick={handleOpenModal} className="btn btn-warning w-100 py-3 fw-bold shadow-sm">
                            Proceder al Pago
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MODAL DE PAGO --- */}
            {showModal && (
                <>
                    <div 
                        className="modal-backdrop show" 
                        style={{ opacity: 0.5, zIndex: 1040 }}
                        onClick={() => setShowModal(false)}
                    ></div>

                    <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content bg-white text-dark shadow-lg border-0">
                                
                                <div className="modal-header border-bottom-0">
                                    <h5 className="modal-title fw-bold">Pasarela de Pago Segura</h5>
                                    {step === 1 && (
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    )}
                                </div>

                                <div className="modal-body p-4">
                                    {step === 1 && (
                                        <form onSubmit={handlePaySimulation}>
                                            <div className="alert alert-primary d-flex align-items-center py-2">
                                                <i className="bi bi-info-circle-fill me-2"></i>
                                                <small>Modo Simulación: Ingresa cualquier dato.</small>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Número de Tarjeta</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-credit-card"></i></span>
                                                    <input type="text" className="form-control" placeholder="0000 0000 0000 0000" required />
                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-6 mb-3">
                                                    <label className="form-label fw-bold">Fecha Exp.</label>
                                                    <input type="text" className="form-control" placeholder="MM/AA" required />
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <label className="form-label fw-bold">CVV</label>
                                                    <input type="password" className="form-control" placeholder="123" required />
                                                </div>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Titular</label>
                                                <input type="text" className="form-control" placeholder="Nombre como aparece en la tarjeta" required />
                                            </div>

                                            <div className="d-grid mt-4">
                                                <button type="submit" className="btn btn-success btn-lg fw-bold">
                                                    Pagar ${totalFinal.toLocaleString()}
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {step === 2 && (
                                        <div className="text-center py-5">
                                            <div className="spinner-border text-primary mb-4" style={{width: '3rem', height: '3rem'}} role="status"></div>
                                            <h5 className="fw-bold">Procesando transacción...</h5>
                                            <p className="text-muted">Conectando con el banco emisor.</p>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="text-center py-4">
                                            <div className="mb-3">
                                                <i className="bi bi-check-circle-fill text-success" style={{fontSize: '5rem'}}></i>
                                            </div>
                                            <h3 className="text-success fw-bold">¡Pago Exitoso!</h3>
                                            <p className="text-muted">Su pedido ha sido confirmado.</p>
                                            <button onClick={handleCloseSuccess} className="btn btn-dark mt-3 px-4 py-2">
                                                Ver mis compras
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}