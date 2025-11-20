import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../../services/apiService';
import { useChileanRegions } from '../../hooks/useChileanRegions';
import toast from 'react-hot-toast';

export function UserForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    
    // mode: 'onChange' activa las alertas rojas mientras escribes
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({ mode: 'onChange' });
    
    const { regiones, comunas, loadingRegions, loadingComunas, fetchComunas } = useChileanRegions();
    const selectedRegion = watch('region');
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        if (isEditing) {
            toast.promise(
                getUserById(id).then(user => {
                    setUserToEdit(user);
                    setValue('nombre', user.nombre);
                    setValue('email', user.email);
                    setValue('rol', user.rol);
                    setValue('region', user.region);
                }),
                { loading: 'Cargando...', success: 'Datos cargados', error: 'Error al cargar usuario' }
            );
        }
    }, [id, isEditing, setValue]);

    useEffect(() => {
        if (selectedRegion) fetchComunas(selectedRegion);
    }, [selectedRegion, fetchComunas]);

    useEffect(() => {
        if (isEditing && userToEdit && comunas.length > 0) {
            setValue('comuna', userToEdit.comuna);
        }
    }, [comunas, isEditing, userToEdit, setValue]);

    const onSubmit = async (data) => {
        if (isEditing && !data.contrasena) delete data.contrasena;
        
        const promise = isEditing ? updateUser(id, data) : createUser(data);
        try {
            await toast.promise(promise, {
                loading: 'Procesando...',
                success: `Usuario ${isEditing ? 'editado' : 'creado'} correctamente`,
                error: (err) => `Error: ${err.message}`
            });
            navigate('/users');
        } catch (error) {}
    };

    return (
        <div className="fade-in">
            <div className="card-dark-form w-100 w-lg-75 mx-auto">
                <div className="card-dark-header d-flex justify-content-between align-items-center">
                    <h3 className="mb-0 fw-bold text-primary">
                        <i className={`bi ${isEditing ? 'bi-person-gear' : 'bi-person-plus'} me-2`}></i>
                        {isEditing ? 'Editar Usuario' : 'Registrar Usuario'}
                    </h3>
                    <Link to="/users" className="btn btn-outline-light btn-sm">Volver</Link>
                </div>

                <div className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label-dark">Nombre Completo</label>
                                <input 
                                    {...register('nombre', { 
                                        required: 'El nombre es obligatorio',
                                        minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                                        pattern: { value: /^[a-zA-Z\s]+$/, message: 'Solo se permiten letras y espacios' }
                                    })} 
                                    className={`form-control form-control-dark ${errors.nombre ? 'is-invalid' : ''}`} 
                                    placeholder="Ej: Juan Pérez"
                                />
                                {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                            </div>
                            
                            <div className="col-md-6 mb-3">
                                <label className="form-label-dark">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    {...register('email', { 
                                        required: 'El correo es obligatorio',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                            message: 'Formato de correo inválido'
                                        }
                                    })} 
                                    className={`form-control form-control-dark ${errors.email ? 'is-invalid' : ''}`} 
                                    placeholder="ejemplo@correo.com"
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label-dark">Rol</label>
                                <select {...register('rol', { required: 'Selecciona un rol' })} className="form-select form-select-dark" defaultValue="cliente">
                                    <option value="cliente">Cliente</option>
                                    <option value="vendedor">Vendedor</option>
                                    <option value="super-admin">Administrador</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label-dark">Contraseña</label>
                                <input 
                                    type="password" 
                                    {...register('contrasena', isEditing ? {} : { 
                                        required: 'La contraseña es obligatoria', 
                                        minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                                        pattern: {
                                            // Regla: Al menos 1 número y 1 símbolo
                                            value: /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/,
                                            message: 'Debe incluir un número y un símbolo (!@#$)'
                                        }
                                    })} 
                                    className={`form-control form-control-dark ${errors.contrasena ? 'is-invalid' : ''}`} 
                                    placeholder={isEditing ? '(Sin cambios)' : 'Mín. 10 caracteres + símbolo'}
                                />
                                {errors.contrasena && <div className="invalid-feedback">{errors.contrasena.message}</div>}
                            </div>
                        </div>

                        <h5 className="text-white mt-3 mb-3 border-bottom border-secondary pb-2">Ubicación</h5>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label-dark">Región</label>
                                <select 
                                    {...register('region', { required: 'Debes seleccionar una región' })} 
                                    className={`form-select form-select-dark ${errors.region ? 'is-invalid' : ''}`}
                                    disabled={loadingRegions}
                                >
                                    <option value="">Seleccione región...</option>
                                    {regiones.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                                </select>
                                {errors.region && <div className="invalid-feedback">{errors.region.message}</div>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label-dark">Comuna</label>
                                <select 
                                    {...register('comuna', { required: 'Debes seleccionar una comuna' })} 
                                    className={`form-select form-select-dark ${errors.comuna ? 'is-invalid' : ''}`}
                                    disabled={loadingComunas || !selectedRegion}
                                >
                                    <option value="">Seleccione comuna...</option>
                                    {comunas.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                                </select>
                                {errors.comuna && <div className="invalid-feedback">{errors.comuna.message}</div>}
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Link to="/users" className="btn btn-outline-secondary">Cancelar</Link>
                            <button type="submit" className="btn btn-primary fw-bold px-4" disabled={isSubmitting}>
                                {isSubmitting ? 'Guardando...' : 'Guardar Usuario'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}