import { render, screen, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext' // Import relativo al mismo directorio
import { describe, it, expect } from 'vitest'

// Componente auxiliar para probar el hook useCart
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, clearCart, total } = useCart()
  
  return (
    <div>
      <span data-testid="cart-length">{cart.length}</span>
      <span data-testid="total-price">{total}</span>
      <button onClick={() => addToCart({ id: 1, nombre: 'Prod 1', precio: 100, stock: 5 })}>Agregar</button>
      <button onClick={() => removeFromCart(1)}>Eliminar</button>
      <button onClick={clearCart}>Limpiar</button>
    </div>
  )
}

describe('CartContext Logic', () => {
  
  it('agrega productos al carrito y calcula el total', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // 1. Estado inicial vacío (cart length 0)
    expect(screen.getByTestId('cart-length').textContent).toBe('0')

    // 2. Agregar producto
    await act(async () => {
      screen.getByText('Agregar').click()
    })

    // 3. Verificar actualización (1 item, total 100)
    expect(screen.getByTestId('cart-length').textContent).toBe('1')
    expect(screen.getByTestId('total-price').textContent).toBe('100')
  })

  it('limpia el carrito correctamente', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar y luego limpiar
    await act(async () => {
      screen.getByText('Agregar').click()
    })
    expect(screen.getByTestId('cart-length').textContent).toBe('1')

    await act(async () => {
      screen.getByText('Limpiar').click()
    })
    expect(screen.getByTestId('cart-length').textContent).toBe('0')
  })
})