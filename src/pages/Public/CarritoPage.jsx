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

    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    // Estado para guardar los datos de la boleta generada
    const [boletaData, setBoletaData] = useState(null);

    const costoEnvio = 4000;
    const totalFinal = total + (cart.length > 0 ? costoEnvio : 0);
    
    // Cálculos de IVA (Chile 19%)
    const neto = Math.round(totalFinal / 1.19);
    const iva = totalFinal - neto;

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
        setStep(2); 
        
        // Datos para el backend
        const ventaData = {
            total: totalFinal,
            cantidadItems: cart.reduce((acc, item) => acc + item.cantidad, 0),
            detalles: cart.map(item => ({ cantidad: item.cantidad })) // Simplificado
        };

        // Datos para mostrar en la boleta visual
        const boletaGenerada = {
            id: Math.floor(Math.random() * 100000) + 5000, // ID Simulado
            fecha: new Date().toLocaleString(),
            cliente: user.nombre,
            rut: "19.999.999-K", // Simulado
            items: [...cart],
            neto,
            iva,
            envio: costoEnvio,
            total: totalFinal
        };

        setTimeout(async () => {
            try {
                await createVenta(ventaData);
                setBoletaData(boletaGenerada);
                setStep(3); // Mostrar Boleta
                clearCart();
            } catch (error) {
                toast.error("Error procesando el pago");
                setShowModal(false);
            }
        }, 2500);
    };

    const handleCloseSuccess = () => {
        setShowModal(false);
        navigate('/mis-compras');
    };

    if (cart.length === 0 && step !== 3) {
        return (
            <div className="container text-center mt-5 pt-5">
                <div className="p-5 rounded bg-white shadow-sm">
                    <i className="bi bi-cart-x display-1 text-muted"></i>
                    <h2 className="mt-3">Tu carrito está vacío</h2>
                    <Link to="/catalogo" className="btn btn-primary mt-3">Ir a comprar</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mb-5" style={{ marginTop: '100px' }}>
            <h2 className="mb-4 text-white"><i className="bi bi-cart3"></i> Tu Carrito</h2>

            <div className="row">
                {/* Lista Productos */}
                <div className="col-lg-8">
                    {cart.map((item) => (
                        <div key={item.id} className="card mb-3 shadow-sm border-0" style={{ backgroundColor: '#1e293b' }}>
                            <div className="card-body d-flex align-items-center">
                                <img src={item.imagen ? `http://localhost:8080/api/uploads/${item.imagen}` : 'https://via.placeholder.com/80'} 
                                     alt="prod" style={{width: '80px', borderRadius: '10px'}} />
                                <div className="ms-3 flex-grow-1">
                                    <h5 className="mb-1 text-white">{item.nombre}</h5>
                                    <p className="text-white-50 small mb-0">Unitario: ${item.precio.toLocaleString()}</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input type="number" className="form-control text-center me-3" style={{width: '60px'}} 
                                           value={item.cantidad} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} />
                                    <button onClick={() => removeFromCart(item.id)} className="btn btn-outline-danger btn-sm"><i className="bi bi-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen con IVA */}
                <div className="col-lg-4">
                    <div className="card shadow border-0 p-4 bg-white">
                        <h4 className="mb-3">Resumen</h4>
                        <div className="d-flex justify-content-between mb-1 text-secondary small">
                            <span>Monto Neto</span>
                            <span>${neto.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1 text-secondary small">
                            <span>IVA (19%)</span>
                            <span>${iva.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 text-secondary border-bottom pb-2">
                            <span>Envío</span>
                            <span>${costoEnvio.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-4 fs-4 fw-bold text-dark">
                            <span>Total</span>
                            <span>${totalFinal.toLocaleString()}</span>
                        </div>
                        <button onClick={handleOpenModal} className="btn btn-warning w-100 py-3 fw-bold shadow-sm">Pagar</button>
                    </div>
                </div>
            </div>

            {/* --- MODAL DE PAGO & BOLETA --- */}
            {showModal && (
                <>
                    <div className="modal-backdrop show" style={{ opacity: 0.5, zIndex: 1040 }} onClick={() => step !== 3 && setShowModal(false)}></div>
                    <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content shadow-lg border-0">
                                
                                {/* PASO 1 & 2: FORMULARIO Y CARGA (Igual que antes) */}
                                {step !== 3 && (
                                    <div className="modal-body p-4 bg-white rounded">
                                        {step === 1 ? (
                                            <form onSubmit={handlePaySimulation}>
                                                <h5 className="fw-bold mb-3">Pago Seguro</h5>
                                                <div className="mb-3"><input type="text" className="form-control" placeholder="Número de Tarjeta" required /></div>
                                                <div className="row mb-3">
                                                    <div className="col-6"><input type="text" className="form-control" placeholder="MM/AA" required /></div>
                                                    <div className="col-6"><input type="password" className="form-control" placeholder="CVV" required /></div>
                                                </div>
                                                <button type="submit" className="btn btn-success w-100">Pagar ${totalFinal.toLocaleString()}</button>
                                            </form>
                                        ) : (
                                            <div className="text-center py-4">
                                                <div className="spinner-border text-primary mb-3"></div>
                                                <h5>Procesando...</h5>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* PASO 3: BOLETA ELECTRÓNICA */}
                                {step === 3 && boletaData && (
                                    <div className="modal-body p-0 bg-light rounded overflow-hidden">
                                        {/* Encabezado Estilo Térmico */}
                                        <div className="bg-white p-4 text-center border-bottom border-dashed">
                                            <h4 className="fw-bold mb-0 text-uppercase" style={{fontFamily: 'monospace'}}>FLASHU S.A.</h4>
                                            <p className="small text-muted mb-2">RUT: 76.123.456-8</p>
                                            <p className="small text-muted mb-0">Santiago, Chile</p>
                                            <hr className="my-3 border-secondary" />
                                            <h5 className="fw-bold">BOLETA ELECTRÓNICA</h5>
                                            <p className="mb-0">Nº {boletaData.id}</p>
                                            <p className="small text-muted">{boletaData.fecha}</p>
                                        </div>

                                        {/* Detalles */}
                                        <div className="p-4" style={{fontFamily: 'monospace'}}>
                                            <div className="d-flex justify-content-between small mb-3">
                                                <span>CLIENTE:</span>
                                                <span className="fw-bold text-uppercase">{boletaData.cliente}</span>
                                            </div>

                                            <table className="table table-sm table-borderless mb-3">
                                                <thead className="border-bottom">
                                                    <tr><th>Cant.</th><th>Item</th><th className="text-end">Total</th></tr>
                                                </thead>
                                                <tbody>
                                                    {boletaData.items.map((item, idx) => (
                                                        <tr key={idx}>
                                                            <td>{item.cantidad}</td>
                                                            <td>{item.nombre.substring(0,15)}</td>
                                                            <td className="text-end">${(item.precio * item.cantidad).toLocaleString()}</td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td colSpan="2">Envío</td>
                                                        <td className="text-end">${boletaData.envio.toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <div className="border-top border-dark pt-2">
                                                <div className="d-flex justify-content-between small"><span>Neto:</span><span>${boletaData.neto.toLocaleString()}</span></div>
                                                <div className="d-flex justify-content-between small"><span>IVA (19%):</span><span>${boletaData.iva.toLocaleString()}</span></div>
                                                <div className="d-flex justify-content-between fs-5 fw-bold mt-2"><span>TOTAL:</span><span>${boletaData.total.toLocaleString()}</span></div>
                                            </div>
                                        </div>

                                        <div className="bg-dark text-white p-3 text-center">
                                            <button onClick={handleCloseSuccess} className="btn btn-warning btn-sm fw-bold w-100">
                                                Finalizar y Guardar
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}