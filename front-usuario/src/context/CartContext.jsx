import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto, cantidad = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productos_id === producto.productos_id);
      if (existing) {
        return prev.map(item =>
          item.productos_id === producto.productos_id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.productos_id !== id));
  };

  const clearCart = () => setCart([]);

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};