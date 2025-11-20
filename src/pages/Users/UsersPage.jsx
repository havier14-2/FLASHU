import { useEffect, useState } from 'react';
import { UserList } from '../../components/users/UserList/UserList';
import { useChileanRegions } from '../../hooks/useChileanRegions'; // Importamos el hook
import { getUsers, toggleUserStatus, deleteUser } from '../../services/apiService';
import toast from 'react-hot-toast';

export function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // AQUÍ ESTÁ LA CLAVE: Usamos el hook para obtener la lista "maestra" de regiones
    const { regiones } = useChileanRegions(); 

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            toast.error('Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleStatus = async (user) => {
        const action = user.estado === 'activo' ? 'desactivar' : 'activar';
        if (window.confirm(`¿${action} a ${user.nombre}?`)) {
            try {
                await toggleUserStatus(user.id);
                toast.success(`Estado actualizado`);
                fetchUsers();
            } catch (err) { toast.error("Error al actualizar"); }
        }
    };

    const handleDelete = async (user) => {
        if (window.confirm(`¿ELIMINAR a ${user.nombre}?`)) {
            try {
                await deleteUser(user.id);
                toast.success("Usuario eliminado");
                fetchUsers();
            } catch (err) { toast.error("Error al eliminar"); }
        }
    };

    if (loading) return <div className="text-center mt-5 text-white">Cargando...</div>;

    return (
        <UserList 
            users={users} 
            regiones={regiones} // <--- Pasamos las regiones a la tabla para que traduzca los IDs
            onToggleStatus={handleToggleStatus} 
            onDelete={handleDelete} 
        />
    );
}