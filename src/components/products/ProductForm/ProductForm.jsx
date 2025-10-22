import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct, getCategories } from '../../../services/apiService';
import toast from 'react-hot-toast';

export function ProductForm() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
    
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
                    // Llenamos el formulario con los datos del producto existente
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
                toast.error("No se pudieron cargar los datos necesarios.");
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
                loading: 'Guardando producto...',
                success: `Producto ${isEditing ? 'actualizado' : 'creado'} con éxito`,
                error: (err) => `Error: ${err.message}`
            });
            navigate('/products');
        } catch (error) {
            // El toast ya maneja el mensaje de error
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <div className="form-header"><h3>{isEditing ? 'Editar' : 'Crear'} Producto</h3></div>
            <div className="form-body">
                <div className="form-grid">
                    <div className="main-fields">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre del Producto</label>
                            <input {...register('nombre', { required: 'El nombre es obligatorio' })} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                            {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea {...register('descripcion')} className="form-control" rows="4"></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label htmlFor="precio">Precio</label>
                                <input type="number" {...register('precio', { required: 'El precio es obligatorio', valueAsNumber: true, min: { value: 1, message: 'El precio debe ser positivo' } })} className={`form-control ${errors.precio ? 'is-invalid' : ''}`} />
                                {errors.precio && <div className="invalid-feedback">{errors.precio.message}</div>}
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="stock">Stock</label>
                                <input type="number" {...register('stock', { required: 'El stock es obligatorio', valueAsNumber: true, min: { value: 0, message: 'El stock no puede ser negativo' } })} className={`form-control ${errors.stock ? 'is-invalid' : ''}`} />
                                {errors.stock && <div className="invalid-feedback">{errors.stock.message}</div>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoria">Categoría</label>
                            <select {...register('categoria', { required: 'Debe seleccionar una categoría' })} className={`form-select ${errors.categoria ? 'is-invalid' : ''}`}>
                                <option value="">Seleccione una categoría</option>
                                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                            </select>
                            {errors.categoria && <div className="invalid-feedback">{errors.categoria.message}</div>}
                        </div>
                         <div className="form-group form-check">
                            <input type="checkbox" {...register('activo')} className="form-check-input" defaultChecked={true} />
                            <label htmlFor="activo" className="form-check-label">Producto Activo</label>
                        </div>
                    </div>
                    <div className="side-fields">
                        <div className="form-group">
                            <label htmlFor="imagen">Imagen</label>
                            <input type="file" {...register('imagen')} className="form-control" accept="image/*" onChange={handleImageChange} />
                            {(imagePreview || existingImage) && <img src={imagePreview || existingImage} alt="Vista previa" className="image-preview" />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-actions">
                <button type="button" onClick={() => navigate('/products')} className="btn btn-secondary" disabled={isSubmitting}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                </button>
            </div>
        </form>
    );
}