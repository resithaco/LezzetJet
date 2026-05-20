import React from "react";
import { ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";

export default function Basket() {
  const navigate = useNavigate();
  // 1. استدعاء جميع المتغيرات والدوال التي استخدمتها في الأسفل
  const { cartItems, removeFromCart, addToCart, cartTotal } = useCart();

  // تجنب الخطأ في حال كانت cartItems غير محملة بعد
  if (!cartItems) return null;

  return (
    <div style={{ margin: "40px 0" }}>
      {cartItems.length === 0 ? (
        <>
          <div style={{ fontSize: "50px", marginBottom: "15px" }}>🛍️</div>
          <h4
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2d2d2d",
              margin: "0 0 5px 0",
            }}
          >
            Sepetiniz şu an boş görünüyor
          </h4>
          <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>
            Arzu ettiğiniz lezzetleri menüden seçip sepetinize ekleyebilirsiniz.
          </p>
        </>
      ) : (
        <div style={{ textAlign: "left" }}>
          {cartItems.map((item, index) => (
            <div
              key={item.id || index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#2d2d2d",
                    fontSize: "14px",
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    color: "#ff385c",
                    fontSize: "13px",
                    marginTop: "4px",
                  }}
                >
                  {(item.price * item.quantity).toFixed(2)} TL
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "1px solid #ddd",
                    backgroundColor: "#fff",
                    color: "#2d2d2d",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  -
                </button>
                {/* 💡 تم إضافة color: "#2d2d2d" هنا لمنع اختفاء الرقم عند الهوفر */}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item, item.restaurantId)}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "1px solid #ff385c",
                    backgroundColor: "#ff385c",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2d2d2d",
            }}
          >
            <span>Toplam:</span>
            <span>{cartTotal ? cartTotal.toFixed(2) : "0.00"} TL</span>
          </div>
          <button
            onClick={() => navigate("/payment")}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#ff385c",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              marginTop: "15px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sepeti Onayla
          </button>
        </div>
      )}
    </div>
  );
}
