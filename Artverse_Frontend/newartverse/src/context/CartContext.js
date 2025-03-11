import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Add NFT to cart
  const addToCart = (nft) => {
    // Check if the NFT is already in the cart
    if (cartItems.some(item => item.id === nft.id)) {
      return false; // Already in cart
    }
    
    // Add NFT to cart
    setCartItems([...cartItems, nft]);
    return true;
  };

  // Remove NFT from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Skip items where price is "Not listed"
      if (item.price === "Not listed") return total;
      return total + parseFloat(item.price);
    }, 0).toFixed(4);
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        addToCart,
        removeFromCart,
        toggleCart,
        getCartTotal,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}