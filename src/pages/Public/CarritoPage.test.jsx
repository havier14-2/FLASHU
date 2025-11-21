import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { CarritoPage } from './CarritoPage'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'

// Mock de toast
vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() }
}))

// Mock del servicio API
vi.mock('../../services/apiService', () => ({
    createVenta: vi.fn()
}))

const mockRemove = vi.fn()
const mockUpdate = vi.fn()
const mockClear = vi.fn()
const mockLogin = vi.fn()

const renderCartPage = (cartItems, user = { nombre: 'Test User' }) => {
    const total = cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    
    // DIAGNÓSTICO: Si esto falla, el problema es la importación
    if (!CartContext) throw new Error("CRÍTICO: CartContext es undefined. Revisa src/context/CartContext.jsx (debe tener 'export const CartContext')");
    if (!AuthContext) throw new Error("CRÍTICO: AuthContext es undefined. Revisa src/context/AuthContext.jsx (debe tener 'export const AuthContext')");

    return render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user, login: mockLogin }}>
                <CartContext.Provider value={{ 
                    cart: cartItems, 
                    removeFromCart: mockRemove, 
                    updateQuantity: mockUpdate, 
                    clearCart: mockClear,
                    total 
                }}>
                    <CarritoPage />
                </CartContext.Provider>
            </AuthContext.Provider>
        </MemoryRouter>
    )
}

describe('CarritoPage.jsx', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('muestra mensaje de carrito vacío si no hay productos', () => {
        renderCartPage([])
        // Busca el texto exacto que pusiste en tu componente (insensible a mayúsculas)
        expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
    })

    it('renderiza los productos correctamente', () => {
        const items = [
            { id: 1, nombre: 'Producto Test', precio: 10000, cantidad: 2, stock: 5, imagen: 'img.jpg' }
        ]
        renderCartPage(items)

        expect(screen.getByText('Producto Test')).toBeInTheDocument()
        // Buscamos el precio formateado (10.000)
        const precioElement = screen.getByText((content) => content.includes('10.000') || content.includes('10,000'));
        expect(precioElement).toBeInTheDocument();
    })

    it('muestra el botón de pagar si hay items', () => {
        const items = [{ id: 1, nombre: 'P1', precio: 100, cantidad: 1, stock: 5 }]
        renderCartPage(items)
        
        // El texto del botón en tu código actual es "Pagar" o "Proceder al Pago"
        // Usamos un regex flexible para que coincida con cualquiera de los dos
        expect(screen.getByRole('button', { name: /pagar|proceder/i })).toBeInTheDocument()
    })
})