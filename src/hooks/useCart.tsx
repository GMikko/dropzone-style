
import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
  color?: string;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dropzone-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        localStorage.removeItem('dropzone-cart');
      }
    }
  }, []);
  
  // Update cart total when items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
    
    // Save to localStorage
    localStorage.setItem('dropzone-cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Add item to cart
  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number = 1, size?: string, color?: string) => {
    setCartItems(prevItems => {
      // Check if product already in cart
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity, size, color }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (id: string, size?: string, color?: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === id && item.size === size && item.color === color)
      )
    );
  };
  
  // Update item quantity
  const updateQuantity = (id: string, quantity: number, size?: string, color?: string) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.id === id && item.size === size && item.color === color)
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('dropzone-cart');
  };
  
  return {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
  };
}
