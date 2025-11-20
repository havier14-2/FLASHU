import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// --- Pages Públicas ---
import { HomePage } from './pages/Public/HomePage';
import { ProductCatalog } from './pages/Public/ProductCatalog';
import { AboutPage } from './pages/Public/AboutPage';
import { NewsPage } from './pages/Public/NewsPage';
import { CarritoPage } from './pages/Public/CarritoPage';
import { HistoryPage } from './pages/Public/HistoryPage'; // <--- ¡IMPORTANTE!
import { LoginPage } from './pages/Login/LoginPage';

// --- Layouts y Admin ---
import { PublicLayout } from './components/common/PublicLayout';
import { AdminLayout } from './components/common/AdminLayout/AdminLayout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { UsersPage } from './pages/Users/UsersPage';
import { UserFormPage } from './pages/Users/UserFormPage';
import { ProductsPage } from './pages/Products/ProductsPage';
import { ProductForm } from './components/products/ProductForm/ProductForm';

// --- Estilos ---
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Toaster 
                        position="bottom-right" 
                        toastOptions={{ duration: 4000 }} 
                    />
                    <Routes>
                        
                        {/* RUTAS PÚBLICAS (Layout Oscuro) */}
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/catalogo" element={<ProductCatalog />} />
                            <Route path="/nosotros" element={<AboutPage />} />
                            <Route path="/noticias" element={<NewsPage />} />
                            <Route path="/carrito" element={<CarritoPage />} />
                            
                            {/* RUTA QUE FALTABA */}
                            <Route path="/mis-compras" element={<HistoryPage />} />
                            
                            {/* Redirección por compatibilidad */}
                            <Route path="/productos" element={<Navigate to="/catalogo" replace />} />
                        </Route>

                        <Route path="/login" element={<LoginPage />} />
                        
                        {/* RUTAS ADMIN (Dashboard) */}
                        <Route element={<AdminLayout />}>
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/products/create" element={<ProductForm />} />
                            <Route path="/products/edit/:id" element={<ProductForm />} />
                            <Route path="/users" element={<UsersPage />} />
                            <Route path="/users/create" element={<UserFormPage />} />
                            <Route path="/users/edit/:id" element={<UserFormPage />} />
                        </Route>
                        
                        {/* CATCH-ALL: Si la ruta no existe, va al inicio */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;