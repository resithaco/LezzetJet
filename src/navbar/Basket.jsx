import React from "react";
import { ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import "./Basket.css";

export default function Basket() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, addToCart, cartTotal } = useCart();
  if (!cartItems) return null;
  return (
    <div className="basket-wrapper">
      {cartItems.length === 0 ? (
        <div className="empty-basket-container">
          <div className="empty-basket-icon">🛍️</div>
          <h4 className="empty-basket-title">Sepetiniz şu an boş görünüyor</h4>
          <p className="empty-basket-text">
            Arzu ettiğiniz lezzetleri menüden seçip sepetinize ekleyebilirsiniz.
          </p>
        </div>
      ) : (
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-row">
              <div>
                <div className="item-name">{item.name}</div>
                <div className="item-total-price">
                  {(item.price * item.quantity).toFixed(2)} TL
                </div>
              </div>
              <div className="quantity-control-group">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-decrease"
                >
                  -
                </button>
                <span className="item-quantity-badge">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item, item.restaurantId)}
                  className="btn-increase"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary-total">
            <span>Toplam:</span>
            <span>{cartTotal ? cartTotal.toFixed(2) : "0.00"} TL</span>
          </div>
          <button
            onClick={() => navigate("/payment")}
            className="checkout-submit-btn"
          >
            Sepeti Onayla
          </button>
        </div>
      )}
    </div>
  );
}
