import { useEffect, useState } from 'react';
import { UserList } from '../../components/users/UserList/UserList';
import { getUsers, toggleUserStatus, deleteUser } from '../../services/apiService';

export function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
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
            try {
                await toggleUserStatus(user.id);
                fetchUsers();
            } catch (err) {
                alert(`Error al ${action} el usuario.`);
            }
        }
    };

    const handleDelete = async (user) => {
        if (window.confirm(`¡ACCIÓN IRREVERSIBLE! ¿Seguro que quieres ELIMINAR a ${user.nombre}?`)) {
            try {
                await deleteUser(user.id);
                fetchUsers();
            } catch (err) {
                alert('Error al eliminar el usuario.');
            }
        }
    };

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <UserList 
            users={users} 
            onToggleStatus={handleToggleStatus} 
            onDelete={handleDelete} 
        />
    );
}