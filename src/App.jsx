import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Pages
import { LoginPage } from './pages/Login/LoginPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { UsersPage } from './pages/Users/UsersPage';
import { UserFormPage } from './pages/Users/UserFormPage';
import { ProductsPage } from './pages/Products/ProductsPage';
import { ProductForm } from './components/products/ProductForm/ProductForm';

// Layout
import { AdminLayout } from './components/common/AdminLayout/AdminLayout';

// Styles
import './App.css';
import './styles/tables.css';
import './styles/forms.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    
                    <Route element={<AdminLayout />}>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/users/create" element={<UserFormPage />} />
                        <Route path="/users/edit/:id" element={<UserFormPage />} />

                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/create" element={<ProductForm />} />
                        <Route path="/products/edit/:id" element={<ProductForm />} />
                    </Route>
                    
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;