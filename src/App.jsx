import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
// Pages
import { UserFormPage } from './pages/Users/UserFormPage'; // <-- AÑADE ESTA IMPORTACIÓN
import { LoginPage } from './pages/Login/LoginPage';
import { SignupPage } from './pages/Signup/SignupPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { UsersPage } from './pages/Users/UsersPage';
import { ProductsPage } from './pages/Products/ProductsPage';
import { CreateProductPage } from './pages/CreateProduct/CreateProductPage';
import { EditProductPage } from './pages/EditProduct/EditProductPage';
import './styles/tables.css'; // <-- AÑADE ESTA LÍNEA
import './styles/forms.css';
// Layout
import { AdminLayout } from './components/common/AdminLayout/AdminLayout';

import './App.css';

function App() {
    return (
        <Router> {/* <-- 1. Router ENVUELVE TODO PRIMERO */}
            <AuthProvider> {/* <-- 2. AuthProvider VA DENTRO */}
               <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
                <Routes>
                    {/* Rutas Públicas */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* Rutas Privadas con el Layout */}
                    <Route element={<AdminLayout />}>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/users/create" element={<UserFormPage />} /> {/* <-- AÑADE ESTA LÍNEA */}
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/create" element={<CreateProductPage />} />
                        <Route path="/products/edit/:id" element={<EditProductPage />} />
                    </Route>
                    
                    {/* Fallback para cualquier otra ruta */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;