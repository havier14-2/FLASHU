import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, beforeEach, test, expect } from 'vitest'
import { CatalogoPage } from './CatalogoPage'
import { CartContext } from '../../context/CartContext'
import * as apiService from '../../services/apiService'

// Mock de toast para evitar errores visuales en el test
vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() }
}))

// Mock del servicio API
vi.mock('../../services/apiService', () => ({
    getProducts: vi.fn()
}))

const mockAddToCart = vi.fn()

const renderWithContext = (ui) => {
    return render(
        <MemoryRouter>
            <CartContext.Provider value={{ addToCart: mockAddToCart }}>
                {ui}
            </CartContext.Provider>
        </MemoryRouter>
    )
}

describe('CatalogoPage.jsx', () => {
  
  beforeEach(() => {
    mockAddToCart.mockClear()
    vi.clearAllMocks()
  })

  test('carga y muestra productos correctamente', async () => {
    const mockData = {
        content: [
            { id: 1, nombre: 'Teclado Gamer', descripcion: 'RGB Mecánico', precio: 25000, stock: 10, imagen: 'teclado.jpg' },
            { id: 2, nombre: 'Mouse Óptico', descripcion: 'Alta precisión', precio: 15000, stock: 0, imagen: 'mouse.jpg' }
        ]
    }

    apiService.getProducts.mockResolvedValue(mockData)

    renderWithContext(<CatalogoPage />)

    // Verificamos textos que sabemos que existen en tu diseño actual
    expect(await screen.findByText(/FLASHU/i)).toBeInTheDocument()
    
    expect(await screen.findByText('Teclado Gamer')).toBeInTheDocument()
    expect(await screen.findByText('Mouse Óptico')).toBeInTheDocument()
    
    // Verificamos el precio con un regex flexible para puntos o comas
    expect(screen.getByText(/\$25[.,]000/)).toBeInTheDocument()
  })

  test('agrega producto al carrito al hacer click', async () => {
    const mockData = {
        content: [
            { id: 1, nombre: 'Monitor 4K', descripcion: 'Ultra HD', precio: 200000, stock: 5, imagen: 'monitor.jpg' }
        ]
    }

    apiService.getProducts.mockResolvedValue(mockData)

    const user = userEvent.setup()
    renderWithContext(<CatalogoPage />)

    // Buscamos el botón por su título
    const addBtn = await screen.findByTitle(/Agregar al carrito/i)
    
    await user.click(addBtn)

    expect(mockAddToCart).toHaveBeenCalledTimes(1)
    expect(mockAddToCart).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        nombre: 'Monitor 4K'
    }))
  })

  test('botón deshabilitado si no hay stock', async () => {
    const mockData = {
        content: [
            { id: 2, nombre: 'Mouse Agotado', descripcion: '...', precio: 5000, stock: 0, imagen: 'mouse.jpg' }
        ]
    }

    apiService.getProducts.mockResolvedValue(mockData)

    renderWithContext(<CatalogoPage />)

    const productName = await screen.findByText('Mouse Agotado')
    const card = productName.closest('.card')
    const btn = within(card).getByRole('button')

    expect(btn).toBeDisabled()
  })
})