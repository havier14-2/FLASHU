import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import { LoginPage } from './LoginPage' // Import relativo al mismo directorio
import { AuthContext } from '../../context/AuthContext'

// Mock de toast para evitar errores si se llama
vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() }
}))

const mockLoginFunc = vi.fn()

const renderLogin = () => {
    return render(
        <MemoryRouter>
            <AuthContext.Provider value={{ login: mockLoginFunc }}>
                <LoginPage />
            </AuthContext.Provider>
        </MemoryRouter>
    )
}

describe('LoginPage.jsx', () => {
    
    it('renderiza el formulario correctamente', () => {
        renderLogin()
        // Busca el título exacto (insensible a mayúsculas/minúsculas)
        expect(screen.getByText(/iniciar sesión en flashu/i)).toBeInTheDocument()
        
        // Verificamos los placeholders exactos definidos en tu JSX
        expect(screen.getByPlaceholderText(/superadmin@flashu.cl/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*\*/i)).toBeInTheDocument() 
    })

    it('permite escribir en los inputs', () => {
        renderLogin()
        
        const emailInput = screen.getByPlaceholderText(/superadmin@flashu.cl/i)
        const passInput = screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*\*/i)

        // Simular escritura del usuario
        fireEvent.change(emailInput, { target: { value: 'usuario@test.com' } })
        fireEvent.change(passInput, { target: { value: 'password123' } })

        expect(emailInput.value).toBe('usuario@test.com')
        expect(passInput.value).toBe('password123')
    })
})