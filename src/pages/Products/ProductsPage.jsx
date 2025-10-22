import { useEffect, useState, useCallback } from 'react';
import { ProductList } from '../../components/products/ProductList/ProductList';
import { getProducts, deactivateProduct, activateProduct, deleteProduct, getCategories } from '../../services/apiService';
import toast from 'react-hot-toast';

export function ProductsPage() {
    // El estado ahora guarda el objeto de página completo
    const [page, setPage] = useState({ content: [], totalPages: 0, number: 0, first: true, last: true });
    const [filters, setFilters] = useState({ nombre: '', categoriaId: '' });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async (currentPage = 0) => {
        setLoading(true);
        try {
            const categoriaId = filters.categoriaId === '' ? null : filters.categoriaId;
            const data = await getProducts(currentPage, 5, filters.nombre, categoriaId);
            setPage(data); // Guardamos el objeto de página completo
        } catch (err) {
            toast.error('No se pudieron cargar los productos.');
        } finally {
            setLoading(false);
        }
    }, [filters]);
    
    useEffect(() => {
        getCategories().then(setCategories).catch(() => toast.error('Error al cargar categorías.'));
        fetchProducts(); // Carga inicial
    }, [fetchProducts]);

    const handleAction = async (actionPromise, successMsg, errorMsg) => {
        try {
            await toast.promise(actionPromise, {
                loading: 'Procesando...',
                success: successMsg,
                error: errorMsg,
            });
            fetchProducts(page.number); // Recarga la página actual
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleStatus = (product) => {
        const action = product.activo ? 'desactivar' : 'activar';
        if (window.confirm(`¿Seguro que quieres ${action} a ${product.nombre}?`)) {
            handleAction(
                product.activo ? deactivateProduct(product.id) : activateProduct(product.id),
                `Producto ${action}do con éxito`,
                `Error al ${action} el producto`
            );
        }
    };

    const handleDelete = (product) => {
        if (window.confirm(`¡ACCIÓN IRREVERSIBLE! ¿Seguro de ELIMINAR a ${product.nombre}?`)) {
            handleAction(
                deleteProduct(product.id),
                'Producto eliminado con éxito',
                'Error al eliminar el producto'
            );
        }
    };

    return (
        <ProductList
            page={page}
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            onPageChange={fetchProducts}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            loading={loading}
        />
    );
}