import { useParams } from 'react-router-dom';
import { ProductForm } from '../../components/products/ProductForm/ProductForm';

export function EditProductPage() {
    const { id } = useParams(); // Obtiene el 'id' de la URL, por ej: /products/edit/3

    return (
        <div>
            <ProductForm productId={id} />
        </div>
    );
}