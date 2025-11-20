export function NewsPage() {
    const noticias = [
        { id: 1, titulo: "Llega la nueva generación de CPUs", fecha: "19 Nov 2025", resumen: "Rendimiento extremo y eficiencia energética nunca antes vista.", img: "https://images.unsplash.com/photo-1555617981-77e4e7f1058f?auto=format&fit=crop&w=600&q=80" },
        { id: 2, titulo: "Guía: Cómo limpiar tu PC Gamer", fecha: "15 Nov 2025", resumen: "Mantén tu equipo fresco y silencioso con estos consejos.", img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=600&q=80" },
        { id: 3, titulo: "Teclados mecánicos: ¿Cuál elegir?", fecha: "10 Nov 2025", resumen: "Analizamos los switches y formatos más populares del año.", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80" }
    ];

    return (
        <div className="container mt-4 fade-in">
            <h2 className="text-center text-white fw-bold mb-5"><i className="bi bi-newspaper text-info"></i> Blog de Tecnología</h2>
            <div className="row">
                {noticias.map(nota => (
                    <div key={nota.id} className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow" style={{ backgroundColor: '#1e293b' }}>
                            <img src={nota.img} className="card-img-top" alt={nota.titulo} style={{height: '200px', objectFit: 'cover', opacity: 0.8}} />
                            <div className="card-body text-white">
                                <small className="text-info">{nota.fecha}</small>
                                <h5 className="card-title mt-2 fw-bold">{nota.titulo}</h5>
                                <p className="card-text text-white-50 small">{nota.resumen}</p>
                                <button className="btn btn-link text-warning text-decoration-none p-0">Leer más <i className="bi bi-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}