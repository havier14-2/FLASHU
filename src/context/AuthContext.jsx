import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        try {
            const storedUser = sessionStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error al parsear el usuario de sessionStorage", error);
            return null;
        }
    });

    const login = async (credentials) => {
        const userData = await apiLogin(credentials);
        if (userData && userData.rol === 'super-admin') {
            sessionStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            navigate('/dashboard');
            return userData;
        } else {
            throw new Error("Credenciales inválidas o rol no autorizado.");
        }
    };

    const logout = () => {
        sessionStorage.removeItem('user');
        setUser(null);
        navigate('/login', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);