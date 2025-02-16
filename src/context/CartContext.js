// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role === 'client') {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [user]);

  const fetchCartCount = async () => {
    try {
      const cart = await cartService.getCart();
      setCartCount(cart.items.length);
    } catch (err) {
      console.error('Erreur lors du chargement du panier:', err);
      setCartCount(0);
    }
  };

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      updateCartCount,
      fetchCartCount  // Ajoutez fetchCartCount à la valeur du contexte
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);