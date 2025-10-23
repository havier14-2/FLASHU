import { useEffect, useState } from 'react'; // <-- SE AÑADIÓ useState AQUÍ
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../../services/apiService';
import { useChileanRegions } from '../../hooks/useChileanRegions';
import toast from 'react-hot-toast';

export function UserForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm();
    
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
                { loading: 'Cargando usuario...', success: 'Datos cargados', error: 'No se pudo cargar el usuario' }
            );
        }
    }, [id, isEditing, setValue]);

    useEffect(() => {
        if (selectedRegion) {
            fetchComunas(selectedRegion);
        }
    }, [selectedRegion, fetchComunas]);

    useEffect(() => {
        if (isEditing && userToEdit && comunas.length > 0) {
            setValue('comuna', userToEdit.comuna);
        }
    }, [comunas, isEditing, userToEdit, setValue]);

    const onSubmit = async (data) => {
        if (isEditing && !data.contrasena) {
            delete data.contrasena;
        }
        const promise = isEditing ? updateUser(id, data) : createUser(data);
        try {
            await toast.promise(promise, {
                loading: 'Guardando usuario...',
                success: `Usuario ${isEditing ? 'actualizado' : 'creado'} con éxito`,
                error: (err) => `Error: ${err.message}`
            });
            navigate('/users');
        } catch (error) {}
    };

    const passwordValidation = {
        required: { value: !isEditing, message: 'La contraseña es obligatoria' },
        minLength: { value: 10, message: 'La contraseña debe tener al menos 10 caracteres' },
        pattern: {
            value: /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/,
            message: "Debe contener al menos un número y un carácter especial"
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <div className="form-header"><h3>{isEditing ? 'Editar' : 'Crear'} Usuario</h3></div>
            <div className="form-body">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input {...register('nombre', { required: 'El nombre es obligatorio' })} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" {...register('email', { required: 'El email es obligatorio' })} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="rol">Rol</label>
                    <select {...register('rol', { required: 'El rol es obligatorio' })} className={`form-select ${errors.rol ? 'is-invalid' : ''}`} defaultValue="vendedor">
                        <option value="vendedor">Vendedor</option>
                        <option value="super-admin">Super Admin</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input type="password" {...register('contrasena', isEditing ? {} : passwordValidation)} className={`form-control ${errors.contrasena ? 'is-invalid' : ''}`} />
                    {isEditing && <small className="form-text text-muted">Dejar en blanco para no cambiar la contraseña.</small>}
                    {errors.contrasena && <div className="invalid-feedback">{errors.contrasena.message}</div>}
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="region">Región</label>
                        <select {...register('region')} className="form-select" disabled={loadingRegions}>
                            <option value="">{loadingRegions ? 'Cargando...' : 'Seleccione región'}</option>
                            {regiones.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="comuna">Comuna</label>
                        <select {...register('comuna')} className="form-select" disabled={loadingComunas || !selectedRegion}>
                            <option value="">{loadingComunas ? 'Cargando...' : 'Seleccione comuna'}</option>
                            {comunas.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-actions">
                <button type="button" onClick={() => navigate('/users')} className="btn btn-secondary" disabled={isSubmitting}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Guardar Usuario</button>
            </div>
        </form>
    );
}