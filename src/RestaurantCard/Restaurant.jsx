import React from "react";
import { useCart } from "../CartContext/CartContext";
import { useLocation, useParams } from "react-router-dom";

export default function Restaurant() {
  const location = useLocation();
  const { id } = useParams();
  const restaurant = location.state?.restaurant;
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();

  if (!restaurant) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Restoran bilgisi bulunamadı.
      </div>
    );
  }
  return (
    <div
      className="restaurant-detail-container"
      style={{
        backgroundColor: "#fcfcfc",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: "15px 40px 5px 40px",
          fontSize: "13px",
          color: "#777",
        }}
      >
        Antalya &nbsp;&rsaquo;&nbsp; Restoran Liste &nbsp;&rsaquo;&nbsp;{" "}
        <span style={{ color: "#2d2d2d", fontWeight: "bold" }}>
          {restaurant.name}
        </span>
      </div>
      <div
        className="restaurant-header"
        style={{
          display: "flex",
          gap: "25px",
          padding: "20px 40px",
          alignItems: "center",
        }}
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />
        <div>
          <span style={{ fontSize: "13px", color: "#777" }}>
            Döner &bull; Dünya Mutfağı &bull; Restoran Teslimatlı
          </span>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: "5px 0 10px 0",
              color: "#2d2d2d",
            }}
          >
            {restaurant.name}
          </h1>
          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "14px",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#ff385c", fontWeight: "bold" }}>
              🚲{" "}
              {restaurant.is_free_delivery
                ? "Ücretsiz Teslimat"
                : `${restaurant.delivery_fee} TL`}
            </span>
            <span style={{ color: "#2d2d2d" }}>
              🛍️ {restaurant.min_basket || "Min. sepet tutarı 200 TL"}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              ⭐{" "}
              <strong style={{ color: "#2d2d2d" }}>{restaurant.rating}</strong>
              <span style={{ color: "#777" }}>
                ({restaurant.reviews_count || 0}) Yorumları Gör
              </span>
            </span>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 40px 20px 40px" }}>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "15px",
            color: "#2d2d2d",
          }}
        >
          Mevcut fırsatlar
        </h3>
        <div style={{ display: "flex", gap: "15px" }}>
          <div
            style={{
              background: "#2d2d2d",
              color: "#fff",
              padding: "15px",
              borderRadius: "12px",
              width: "240px",
              position: "relative",
            }}
          >
            <strong
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "5px",
              }}
            >
              📱 Yalnızca uygulamaya özel...
            </strong>
            <span style={{ fontSize: "12px", color: "#ccc" }}>
              Daha fazla indirimden yararlanmak için uygulamayı indirin
            </span>
          </div>
          {restaurant.discount && (
            <div
              style={{
                background: "#d4f8e8",
                color: "#008a4b",
                padding: "15px",
                borderRadius: "12px",
                width: "240px",
              }}
            >
              <strong
                style={{
                  display: "block",
                  fontSize: "14px",
                  marginBottom: "5px",
                }}
              >
                🏷️ {restaurant.discount}
              </strong>
              <span style={{ fontSize: "12px" }}>
                Tüm ürünlerde geçerli Otomatik uygulanır
              </span>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
          padding: "15px 40px",
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee",
          backgroundColor: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <input
          type="text"
          placeholder="Menüde Ara"
          style={{
            padding: "10px 15px",
            borderRadius: "20px",
            border: "1px solid #ddd",
            width: "200px",
            backgroundColor: "#f5f5f5",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "15px",
            fontWeight: "600",
            color: "#555",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              color: "#ff385c",
              borderBottom: "2px solid #ff385c",
              paddingBottom: "14px",
            }}
          >
            Menüler ({restaurant.menu?.meals?.length || 0})
          </span>
          <span>İçecekler ({restaurant.menu?.drinks?.length || 0})</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "30px 40px",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 2 }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#2d2d2d",
            }}
          >
            Menüler
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {restaurant.menu?.meals?.map((meal) => (
              <div
                key={meal.meal_id}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #edf0f2",
                  borderRadius: "12px",
                  padding: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        margin: "0 0 5px 0",
                        color: "#2d2d2d",
                      }}
                    >
                      {meal.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#666",
                        margin: "0 0 10px 0",
                        lineHeight: "1.4",
                      }}
                    >
                      {meal.description}
                    </p>
                  </div>
                  <strong style={{ color: "#2d2d2d", fontSize: "16px" }}>
                    {meal.price.toFixed(2)} TL
                  </strong>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "110px",
                    height: "110px",
                  }}
                >
                  <img
                    src={meal.image || "https://via.placeholder.com/110"}
                    alt={meal.name}
                    style={{
                      width: "110px",
                      height: "110px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    onClick={() => addToCart(meal, restaurant.id)}
                    style={{
                      position: "absolute",
                      bottom: "-10px",
                      right: "-10px",
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#ff385c",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: "320px",
            position: "sticky",
            top: "90px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #eee",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid #eee",
                paddingBottom: "15px",
                marginBottom: "20px",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "#ff385c",
                  borderBottom: "2px solid #ff385c",
                  paddingBottom: "10px",
                  cursor: "pointer",
                }}
              >
                Restoran
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "#777",
                  paddingBottom: "10px",
                  cursor: "pointer",
                }}
              >
                Gel Al
              </div>
            </div>

            <div style={{ margin: "40px 0" }}>
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
                Arzu ettiğiniz lezzetleri menüden seçip sepetinize
                ekleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
