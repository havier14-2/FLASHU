import { useState } from 'react';
import { useChileanRegions } from '../../hooks/useChileanRegions';
import './SignupPage.css'; // Importamos estilos

// Reutiliza las constantes de validación
const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupPage() {
    const { regiones, comunas, loadingRegions, loadingComunas, fetchComunas } = useChileanRegions();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        region: '0',
        comuna: '0',
        password: '',
        acepta: false,
    });
    const [errors, setErrors] = useState([]);

    const handleRegionChange = (e) => {
        const regionCode = e.target.value;
        setFormData(prev => ({ ...prev, region: regionCode, comuna: '0' }));
        fetchComunas(regionCode);
    };
    
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const newErrors = [];
        const { nombre, email, region, comuna, password, acepta } = formData;
        
        // Validaciones
        if (!nombre.trim()) newErrors.push("El nombre es obligatorio.");
        else if (nombre.trim().length > 100) newErrors.push("El nombre no puede superar los 100 caracteres.");

        if (!email.trim()) newErrors.push("El correo es obligatorio.");
        else {
            const dominio = email.split("@").pop().toLowerCase();
            if (!EMAIL_REGEX.test(email) || !DOMINIOS_PERMITIDOS.includes(dominio)) {
                newErrors.push("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100 caracteres).");
            }
        }
        
        if (region === '0') newErrors.push("Debe seleccionar una región.");
        if (comuna === '0') newErrors.push("Debe seleccionar una comuna.");
        
        if (!password) newErrors.push("La contraseña es obligatoria.");
        else if (password.length < 4 || password.length > 10) newErrors.push("La contraseña debe tener entre 4 y 10 caracteres.");
        
        if (!acepta) newErrors.push("Debe aceptar los términos y condiciones.");

        setErrors(newErrors);
        return newErrors.length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Usuario registrado con éxito ✅");
            // Aquí enviarías los datos al backend
            console.log("Datos del formulario:", formData);
        }
    };
    
    return (
      <div className="register-body">
        <div className="register-container">
            <h3 className="register-title">Registro de Usuario en FLASHU</h3>
            <form id="registroForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                    <input type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Juan Pérez" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} placeholder="usuario@duoc.cl" />
                </div>
                <div className="mb-3">
                    <label htmlFor="region" className="form-label">Región</label>
                    <select className="form-select" id="region" value={formData.region} onChange={handleRegionChange} disabled={loadingRegions}>
                        <option value="0">{loadingRegions ? 'Cargando...' : 'Seleccione una región'}</option>
                        {regiones.map(r => <option key={r.codigo} value={r.codigo}>{r.nombre}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="comuna" className="form-label">Comuna</label>
                    <select className="form-select" id="comuna" value={formData.comuna} onChange={handleChange} disabled={loadingComunas || formData.region === '0'}>
                        <option value="0">{loadingComunas ? 'Cargando...' : 'Seleccione una comuna'}</option>
                        {comunas.map(c => <option key={c.codigo} value={c.codigo}>{c.nombre}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} placeholder="*********" />
                    <div className="form-text">Debe tener entre 4 y 10 caracteres</div>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="acepta" checked={formData.acepta} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="acepta">Acepto los términos y condiciones</label>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-custom">Registrarme</button>
                </div>
                {errors.length > 0 && (
                    <div id="errores">
                        {errors.map((error, index) => <div key={index}>• {error}</div>)}
                    </div>
                )}
            </form>
        </div>
      </div>
    );
}