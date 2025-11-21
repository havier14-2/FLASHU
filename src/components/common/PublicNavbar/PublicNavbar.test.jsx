import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import { PublicNavbar } from './PublicNavbar'
import { AuthContext } from '../../../context/AuthContext'
import { CartContext } from '../../../context/CartContext'

// Mocks de funciones
const mockLogout = vi.fn()

// Estados iniciales simulados
const userState = null 
const cartState = [] // Carrito vacío por defecto

const renderNavbar = (user = null, cart = []) => {
    return render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user, logout: mockLogout }}>
                <CartContext.Provider value={{ cart }}>
                    <PublicNavbar />
                </CartContext.Provider>
            </AuthContext.Provider>
        </MemoryRouter>
    )
}

describe('PublicNavbar', () => {
    
    it('muestra la marca y los links con sus href correctos', () => {
        renderNavbar()

        // 1. Verificar Marca (FLASHU)
        const brand = screen.getByRole('link', { name: /flashu/i })
        expect(brand).toBeInTheDocument()
        expect(brand).toHaveAttribute('href', '/')

        // 2. Verificar Links Públicos (CORREGIDO: Ahora buscamos "Inicio" en vez de "Home")
        expect(screen.getByRole('link', { name: /inicio/i })).toHaveAttribute('href', '/')
        expect(screen.getByRole('link', { name: /catálogo/i })).toHaveAttribute('href', '/catalogo')
        expect(screen.getByRole('link', { name: /noticias/i })).toHaveAttribute('href', '/noticias')
        expect(screen.getByRole('link', { name: /nosotros/i })).toHaveAttribute('href', '/nosotros')
    })

    it('muestra botón ingresar si no hay usuario', () => {
        renderNavbar(null) // Sin usuario
        expect(screen.getByRole('link', { name: /ingresar/i })).toHaveAttribute('href', '/login')
    })

    it('muestra el badge del carrito cuando hay productos', () => {
        // Simulamos un carrito con 2 productos
        const cartWithItems = [{ id: 1 }, { id: 2 }]
        renderNavbar(null, cartWithItems)

        // CORREGIDO: Buscamos el número exacto de items en el array (2)
        // Usamos getByText porque el badge es un elemento <span> con texto directo
        expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('muestra el menú de usuario si está logueado', () => {
        const mockUser = { nombre: 'Javier', rol: 'cliente' }
        renderNavbar(mockUser)

        // Debe mostrar el nombre del usuario
        expect(screen.getByText(/javier/i)).toBeInTheDocument()
        
        // Debe mostrar el botón salir
        expect(screen.getByRole('button', { name: /salir/i })).toBeInTheDocument()
        
        // NO debe mostrar el botón Ingresar
        expect(screen.queryByRole('link', { name: /ingresar/i })).not.toBeInTheDocument()
    })
})