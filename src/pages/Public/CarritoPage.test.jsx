import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { CarritoPage } from './CarritoPage' // Import relativo
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'

// Mock de toast
vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() }
}))

// IMPORTANTE: Mockeamos el servicio de API porque el componente lo importa.
// Si no hacemos esto, el test fallará si no encuentra el archivo apiService.
vi.mock('../../services/apiService', () => ({
    createVenta: vi.fn()
}))

// Mocks de funciones del contexto
const mockRemove = vi.fn()
const mockUpdate = vi.fn()
const mockClear = vi.fn()
const mockLogin = vi.fn()

const renderCartPage = (cartItems, user = { nombre: 'Test User' }) => {
    const total = cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    
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
        // Busca el texto que tu componente renderiza cuando está vacío
        expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
    })

    it('renderiza los productos correctamente', () => {
        const precio = 10000;
        const items = [
            { id: 1, nombre: 'Producto Test', precio: precio, cantidad: 2, stock: 5, imagen: 'img.jpg' }
        ]
        renderCartPage(items)

        // Verifica nombre
        expect(screen.getByText('Producto Test')).toBeInTheDocument()
        
        // Verifica precio:
        // Buscamos cualquier elemento que contenga "10.000" o "10,000" para evitar errores de formato regional
        const precioRenderizado = screen.queryByText((content) => content.includes('10.000') || content.includes('10,000'));
        expect(precioRenderizado).toBeInTheDocument();
    })

    it('muestra el botón de finalizar compra si hay items', () => {
        const items = [{ id: 1, nombre: 'P1', precio: 100, cantidad: 1, stock: 5 }]
        renderCartPage(items)
        
        // El texto dentro del botón es "Finalizar Compra"
        expect(screen.getByText(/finalizar compra/i)).toBeInTheDocument()
    })
})