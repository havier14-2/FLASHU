import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import { LoginPage } from './LoginPage'
// Aseguramos la importación correcta. Si AuthContext es undefined, fallará aquí.
import { AuthContext } from '../../context/AuthContext'

// Mock de toast
vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() }
}))

const mockLoginFunc = vi.fn()

const renderLogin = () => {
    // Verificación de seguridad
    if (!AuthContext) throw new Error("AuthContext no se importó correctamente. Revisa la ruta o el archivo AuthContext.jsx");

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
        expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/nombre@ejemplo.com/i)).toBeInTheDocument()
    })

    it('permite escribir en los inputs', () => {
        renderLogin()
        
        const emailInput = screen.getByPlaceholderText(/nombre@ejemplo.com/i)
        const passInput = screen.getByPlaceholderText(/••••••••/i)

        fireEvent.change(emailInput, { target: { value: 'usuario@test.com' } })
        fireEvent.change(passInput, { target: { value: 'password123' } })

        expect(emailInput.value).toBe('usuario@test.com')
        expect(passInput.value).toBe('password123')
    })
})