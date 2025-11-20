import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
    // Inicializar desde localStorage
    const [cart, setCart] = useState(() => {
        try {
            const item = localStorage.getItem('cart');
            return item ? JSON.parse(item) : [];
        } catch {
            return [];
        }
    });

    // Persistir en localStorage cada vez que cambie el carrito
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id);
            if (existing) {
                return prevCart.map(item => 
                    item.id === product.id 
                    ? { ...item, cantidad: item.cantidad + 1 } 
                    : item
                );
            }
            return [...prevCart, { ...product, cantidad: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCart(prevCart => prevCart.map(item => 
            item.id === id ? { ...item, cantidad: quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Cálculo del total derivado
    const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            total 
        }}>
            {children}
        </CartContext.Provider>
    );
};