import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("lezzet_jet_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("lezzet_jet_cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = (item, restaurantId) => {
    const targetRestaurantId = restaurantId || item.restaurantId;
    setCartItems((prevItems) => {
      const hasDifferentRestaurant = prevItems.some(
        (i) => i.restaurantId !== targetRestaurantId
      );
      const currentItems = hasDifferentRestaurant ? [] : prevItems;
      if (hasDifferentRestaurant) {
        alert(
          "Farklı bir restorandan ürün eklediniz. Önceki sepetiniz temizlendi!"
        );
      }
      const itemId = item.id || item.meal_id || item.drink_id;
      const existingItem = currentItems.find((i) => i.id === itemId);
      if (existingItem) {
        return currentItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...currentItems,
        {
          id: itemId,
          name: item.name,
          price: item.price,
          restaurantId: targetRestaurantId,
          quantity: 1,
        },
      ];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const clearCart = () => setCartItems([]);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}