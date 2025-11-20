import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createProduct, getProductById, updateProduct, getCategories } from '../../../services/apiService';
import toast from 'react-hot-toast';

export function ProductForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    
    // Activamos validación en tiempo real
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({ mode: 'onChange' });
    
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const [existingImage, setExistingImage] = useState(null);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);

                if (isEditing) {
                    const product = await getProductById(id);
                    setValue('nombre', product.nombre);
                    setValue('descripcion', product.descripcion);
                    setValue('precio', product.precio);
                    setValue('stock', product.stock);
                    setValue('categoria', product.categoria ? product.categoria.id : '');
                    setValue('activo', product.activo);
                    if (product.imagen) {
                        setExistingImage(`http://localhost:8080/api/uploads/${product.imagen}`);
                    }
                }
            } catch (error) {
                toast.error("No se pudieron cargar los datos.");
            }
        };
        loadInitialData();
    }, [id, isEditing, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const onSubmit = async (data) => {
        const imageFile = data.imagen[0] || null;
        const productData = {
            id: isEditing ? parseInt(id) : null,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            stock: data.stock,
            activo: data.activo,
            categoria: { id: parseInt(data.categoria) }
        };

        const promise = isEditing 
            ? updateProduct(id, productData, imageFile)
            : createProduct(productData, imageFile);
        
        try {
            await toast.promise(promise, {
                loading: 'Guardando...',
                success: `Producto ${isEditing ? 'actualizado' : 'creado'} con éxito`,
                error: (err) => `Error: ${err.message}`
            });
            navigate('/products');
        } catch (error) {}
    };

    return (
        <div className="fade-in">
            <div className="card-dark-form">
                <div className="card-dark-header d-flex justify-content-between align-items-center">
                    <h3 className="mb-0 fw-bold text-warning">
                        <i className={`bi ${isEditing ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
                        {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                    </h3>
                    <Link to="/products" className="btn btn-outline-light btn-sm">
                        <i className="bi bi-arrow-left me-1"></i> Volver
                    </Link>
                </div>

                <div className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="mb-3">
                                    <label className="form-label-dark">Nombre del Producto</label>
                                    <input 
                                        {...register('nombre', { 
                                            required: 'El nombre es obligatorio',
                                            minLength: { value: 4, message: 'Mínimo 4 caracteres' }
                                        })} 
                                        className={`form-control form-control-dark ${errors.nombre ? 'is-invalid' : ''}`} 
                                        placeholder="Ej: Audífonos Gamer RGB"
                                    />
                                    {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label-dark">Precio</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text bg-dark border-secondary text-secondary">$</span>
                                            <input 
                                                type="number" 
                                                {...register('precio', { 
                                                    required: 'El precio es obligatorio', 
                                                    min: { value: 100, message: 'El precio debe ser mayor a $100' }
                                                })} 
                                                className={`form-control form-control-dark ${errors.precio ? 'is-invalid' : ''}`} 
                                            />
                                            {errors.precio && <div className="invalid-feedback">{errors.precio.message}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label-dark">Stock</label>
                                        <input 
                                            type="number" 
                                            {...register('stock', { 
                                                required: 'El stock es obligatorio', 
                                                min: { value: 0, message: 'El stock no puede ser negativo' } 
                                            })} 
                                            className={`form-control form-control-dark ${errors.stock ? 'is-invalid' : ''}`} 
                                        />
                                        {errors.stock && <div className="invalid-feedback">{errors.stock.message}</div>}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label-dark">Categoría</label>
                                    <select 
                                        {...register('categoria', { required: 'Debes seleccionar una categoría' })} 
                                        className={`form-select form-select-dark ${errors.categoria ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                                    </select>
                                    {errors.categoria && <div className="invalid-feedback">{errors.categoria.message}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label-dark">Descripción</label>
                                    <textarea 
                                        {...register('descripcion', {
                                            required: 'La descripción es obligatoria',
                                            minLength: { value: 10, message: 'Mínimo 10 caracteres para la descripción' }
                                        })} 
                                        className={`form-control form-control-dark ${errors.descripcion ? 'is-invalid' : ''}`}
                                        rows="4"
                                        placeholder="Detalles técnicos del producto..."
                                    ></textarea>
                                    {errors.descripcion && <div className="invalid-feedback">{errors.descripcion.message}</div>}
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="mb-4">
                                    <label className="form-label-dark">Imagen del Producto</label>
                                    <input 
                                        type="file" 
                                        {...register('imagen')} 
                                        className="form-control form-control-dark mb-3" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                    />
                                    
                                    <div className="border border-secondary rounded-3 p-2 bg-dark d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
                                        {imagePreview || existingImage ? (
                                            <img 
                                                src={imagePreview || existingImage} 
                                                alt="Vista previa" 
                                                className="img-fluid rounded" 
                                                style={{ maxHeight: '100%', maxWidth: '100%' }} 
                                            />
                                        ) : (
                                            <div className="text-secondary text-center">
                                                <i className="bi bi-image fs-1"></i>
                                                <p className="small m-0">Sin imagen</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-check form-switch mb-3">
                                    <input 
                                        type="checkbox" 
                                        {...register('activo')} 
                                        className="form-check-input bg-warning border-0" 
                                        role="switch" 
                                        id="activoSwitch"
                                        defaultChecked={true} 
                                    />
                                    <label className="form-check-label text-white ms-2" htmlFor="activoSwitch">
                                        Producto Visible
                                    </label>
                                </div>
                            </div>
                        </div>

                        <hr className="border-secondary" />

                        <div className="d-flex justify-content-end gap-2">
                            <Link to="/products" className="btn btn-outline-secondary">Cancelar</Link>
                            <button type="submit" className="btn btn-warning fw-bold px-4" disabled={isSubmitting}>
                                {isSubmitting ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-save me-2"></i>}
                                Guardar Producto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}