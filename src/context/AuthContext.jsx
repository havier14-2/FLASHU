import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/apiService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            return null;
        }
    });

    const login = async (credentials) => {
        try {
            // Ahora el backend nos devuelve: { token, nombre, rol, email }
            const userData = await apiLogin(credentials);
            
            // Guardamos todo en el navegador
            localStorage.setItem('user', JSON.stringify(userData)); 
            
            // Actualizamos el estado
            setUser(userData);
            
            return userData; // Devolvemos los datos para que LoginPage pueda leer el rol
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('user'); 
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