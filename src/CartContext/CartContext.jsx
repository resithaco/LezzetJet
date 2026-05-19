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
    setCartItems((prevItems) => {
      // 1. فحص ما إذا كان المستخدم يحاول الإضافة من مطعم مختلف
      const hasDifferentRestaurant = prevItems.some(
        (i) => i.restaurantId !== restaurantId,
      );

      // إذا كان المطعم مختلفاً، نقوم بتفريغ السلة، وإلا نحتفظ بها
      const currentItems = hasDifferentRestaurant ? [] : prevItems;

      if (hasDifferentRestaurant) {
        alert(
          "Farklı bir restorandan ürün eklediniz. Önceki sepetiniz temizlendi!",
        );
      }

      // 2. توحيد المعرف (ID) لتجنب تكرار نفس المنتج في السلة
      const itemId = item.id || item.meal_id || item.drink_id;

      // 3. البحث عما إذا كان المنتج موجوداً بالفعل في السلة الحالية
      const existingItem = currentItems.find((i) => i.id === itemId);

      if (existingItem) {
        // إذا كان موجوداً، نزيد الكمية بمقدار 1 فقط ولا نكرر السطر
        return currentItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      // إذا كان منتجاً جديداً، نضيفه كسطر جديد
      return [
        ...currentItems,
        {
          id: itemId,
          name: item.name,
          price: item.price,
          restaurantId: restaurantId,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
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
