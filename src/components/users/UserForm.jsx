import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../../services/apiService';
import toast from 'react-hot-toast';

export function UserForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (isEditing) {
            toast.promise(
                getUserById(id).then(user => {
                    setValue('nombre', user.nombre);
                    setValue('email', user.email);
                    setValue('rol', user.rol);
                }),
                { loading: 'Cargando usuario...', success: 'Datos cargados', error: 'No se pudo cargar el usuario' }
            );
        }
    }, [id, isEditing, setValue]);

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
        } catch (error) { /* El toast ya maneja el error */ }
    };

    // --- SECCIÓN CORREGIDA ---
    const passwordValidation = {
        required: { value: !isEditing, message: 'La contraseña es obligatoria' },
        minLength: { value: 10, message: 'La contraseña debe tener al menos 10 caracteres' },
        pattern: {
            // Este nuevo patrón busca cualquier caracter que NO sea letra o número
            value: /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/,
            message: "Debe contener al menos un número y un carácter especial"
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <div className="form-header"><h3>{isEditing ? 'Editar' : 'Crear'} Usuario</h3></div>
            <div className="form-body">
                {/* ... (campos nombre, email, rol sin cambios) ... */}
                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input type="password" {...register('contrasena', isEditing ? {} : passwordValidation)} className={`form-control ${errors.contrasena ? 'is-invalid' : ''}`} />
                    {isEditing && <small className="form-text text-muted">Dejar en blanco para no cambiar la contraseña.</small>}
                    {errors.contrasena && <div className="invalid-feedback">{errors.contrasena.message}</div>}
                </div>
            </div>
            <div className="form-actions">
                <button type="button" onClick={() => navigate('/users')} className="btn btn-secondary" disabled={isSubmitting}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Guardar Usuario</button>
            </div>
        </form>
    );
}