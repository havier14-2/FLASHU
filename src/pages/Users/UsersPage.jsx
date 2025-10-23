import { useEffect, useState } from 'react';
import { UserList } from '../../components/users/UserList/UserList';
import { useChileanRegions } from '../../hooks/useChileanRegions';
import { getUsers, toggleUserStatus, deleteUser } from '../../services/apiService';
import toast from 'react-hot-toast';

export function UsersPage() {
    const [users, setUsers] = useState([]);
    const { regiones } = useChileanRegions();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('No se pudieron cargar los usuarios.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleStatus = async (user) => {
        const action = user.estado === 'activo' ? 'desactivar' : 'activar';
        if (window.confirm(`¿Seguro que quieres ${action} a ${user.nombre}?`)) {
            const promise = toggleUserStatus(user.id);
            try {
                await toast.promise(promise, {
                    loading: 'Actualizando estado...',
                    success: `Usuario ${action}do con éxito`,
                    error: (err) => `Error: ${err.message}`
                });
                fetchUsers();
            } catch (err) {}
        }
    };

    const handleDelete = async (user) => {
        if (window.confirm(`¡ACCIÓN IRREVERSIBLE! ¿Seguro que quieres ELIMINAR a ${user.nombre}?`)) {
            const promise = deleteUser(user.id);
            try {
                await toast.promise(promise, {
                    loading: 'Eliminando usuario...',
                    success: 'Usuario eliminado con éxito',
                    error: (err) => `Error: ${err.message}`
                });
                fetchUsers();
            } catch (err) {}
        }
    };

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <UserList 
            users={users} 
            regiones={regiones}
            onToggleStatus={handleToggleStatus} 
            onDelete={handleDelete} 
        />
    );
}