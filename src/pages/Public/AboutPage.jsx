export function AboutPage() {
    return (
        <div className="container mt-4 fade-in">
            <div className="row align-items-center mb-5">
                <div className="col-md-6">
                    <h1 className="fw-bold text-warning mb-3">Sobre Nosotros</h1>
                    <p className="lead text-white-50">
                        Somos <strong>FLASHU</strong>, tu puente directo hacia la innovación tecnológica.
                    </p>
                    <p className="text-light">
                        Nacimos con la idea de romper las barreras de acceso a la tecnología de punta. 
                        Creemos que armar tu PC, mejorar tu setup o conseguir ese gadget que tanto quieres 
                        debe ser una experiencia emocionante, segura y rápida.
                    </p>
                </div>
                <div className="col-md-6 text-center">
                    
                    <img 
                        src="https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&w=800&q=80" 
                        alt="Oficina Flashu" 
                        className="img-fluid rounded-4 shadow-lg opacity-75 border border-secondary"
                    />
                </div>
            </div>

            <div className="row g-4">
                {/* Tarjetas de Valor */}
                {[
                    { icon: 'bi-rocket-takeoff', color: 'text-info', title: 'Rapidez', text: 'Envíos flash a todo el país.' },
                    { icon: 'bi-shield-check', color: 'text-warning', title: 'Garantía', text: 'Productos 100% originales.' },
                    { icon: 'bi-headset', color: 'text-success', title: 'Soporte', text: 'Atención personalizada 24/7.' }
                ].map((item, index) => (
                    <div key={index} className="col-md-4">
                        <div className="p-4 h-100 rounded-4 text-center shadow-sm" 
                             style={{ backgroundColor: '#1e293b', borderTop: '3px solid rgba(255,255,255,0.2)' }}>
                            <i className={`bi ${item.icon} fs-1 ${item.color} mb-3`}></i>
                            <h4 className="text-white">{item.title}</h4>
                            <p className="text-white-50 small">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}