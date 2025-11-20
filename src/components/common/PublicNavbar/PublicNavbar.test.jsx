import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PublicNavbar } from './PublicNavbar'
import { CartContext } from '../../../context/CartContext'
import { AuthContext } from '../../../context/AuthContext'
import { vi } from 'vitest'

// Mock de los contextos necesarios
const mockLogout = vi.fn()
const mockUser = { nombre: 'Juan', rol: 'cliente' }

// Helper para renderizar con contextos
const renderNavbar = (userState, cartState) => {
    return render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user: userState, logout: mockLogout }}>
                <CartContext.Provider value={{ cart: cartState }}>
                    <PublicNavbar />
                </CartContext.Provider>
            </AuthContext.Provider>
        </MemoryRouter>
    )
}

describe('PublicNavbar', () => {

  it('muestra la marca y los links con sus href correctos', () => {
    renderNavbar(null, [])

    const brand = screen.getByText('FLASHU')
    expect(brand).toBeInTheDocument()
    
    // Verificamos links públicos
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /catálogo/i })).toHaveAttribute('href', '/catalogo')
    expect(screen.getByRole('link', { name: /nosotros/i })).toHaveAttribute('href', '/nosotros')
    
    // Botón hamburguesa
    const toggler = screen.getByRole('button', { name: '' }) // El botón tiene un icono dentro
    expect(toggler).toHaveAttribute('data-bs-toggle', 'collapse')
  })

  it('muestra botón ingresar si no hay usuario', () => {
    renderNavbar(null, [])
    const loginBtn = screen.getByRole('link', { name: /ingresar/i })
    expect(loginBtn).toHaveAttribute('href', '/login')
  })

  it('muestra el badge del carrito cuando hay productos', () => {
    const cartWithItems = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 3 }] // Total 5
    renderNavbar(null, cartWithItems)
    
    // Buscamos el número 5 en el documento (el badge)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

})