import React from "react";
import Basket from "../navbar/Basket";
import { useCart } from "../CartContext/CartContext";
import { useLocation, useParams } from "react-router-dom";
import "./Restaurant.css";

export default function Restaurant() {
  const location = useLocation();
  const { id } = useParams();
  const restaurant = location.state?.restaurant;
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();
  if (!restaurant) {
    return (
      <div className="no-restaurant-info">Restoran bilgisi bulunamadı.</div>
    );
  }
  return (
    <div className="restaurant-detail-container">
      <div className="breadcrumb-nav">
        Antalya &nbsp;&rsaquo;&nbsp; Restoran Liste &nbsp;&rsaquo;&nbsp;{" "}
        <span className="breadcrumb-active">{restaurant.name}</span>
      </div>
      <div className="restaurant-header">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-header-img"
        />
        <div>
          <span className="restaurant-meta-tags">
            Döner &bull; Dünya Mutfağı &bull; Restoran Teslimatlı
          </span>
          <h1 className="restaurant-title">{restaurant.name}</h1>
          <div className="restaurant-info-row">
            <span className="delivery-fee-badge">
              🚲{" "}
              {restaurant.is_free_delivery
                ? "Ücretsiz Teslimat"
                : `${restaurant.delivery_fee} TL`}
            </span>
            <span className="min-basket-badge">
              🛍️ {restaurant.min_basket || "Min. sepet tutarı 200 TL"}
            </span>
            <span className="rating-badge">
              ⭐ <strong>{restaurant.rating}</strong>
              <span>({restaurant.reviews_count || 0}) Yorumları Gör</span>
            </span>
          </div>
        </div>
      </div>
      <div className="offers-section">
        <h3 className="offers-title">Mevcut fırsatlar</h3>
        <div className="offers-flex">
          <div className="app-offer-card">
            <strong>📱 Yalnızca uygulamaya özel...</strong>
            <span>
              Dha fazla indirimden yararlanmak için uygulamayı indirin
            </span>
          </div>
          {restaurant.discount && (
            <div className="discount-offer-card">
              <strong>🏷️ {restaurant.discount}</strong>
              <span>Tüm ürünlerde geçerli Otomatik uygulanır</span>
            </div>
          )}
        </div>
      </div>
      <div className="menu-sticky-bar">
        <input
          type="text"
          placeholder="Menüde Ara"
          className="menu-search-input"
        />
        <div className="menu-tabs-container">
          <span className="menu-tab-active">
            Menüler ({restaurant.menu?.meals?.length || 0})
          </span>
          <span>İçecekler ({restaurant.menu?.drinks?.length || 0})</span>
        </div>
      </div>
      <div className="main-content-layout">
        <div className="meals-column">
          <h2 className="meals-column-title">Menüler</h2>
          <div className="meals-grid">
            {restaurant.menu?.meals?.map((meal) => (
              <div key={meal.meal_id} className="meal-card">
                <div className="meal-info-side">
                  <div>
                    <h3 className="meal-name">{meal.name}</h3>
                    <p className="meal-description">{meal.description}</p>
                  </div>
                  <strong className="meal-price">
                    {meal.price.toFixed(2)} TL
                  </strong>
                </div>
                <div className="meal-image-side">
                  <img
                    src={meal.image || "https://via.placeholder.com/110"}
                    alt={meal.name}
                    className="meal-img"
                  />
                  <button
                    onClick={() =>
                      addToCart(
                        { ...meal, id: meal.meal_id, restaurantId: restaurant.id },
                        restaurant.id
                      )
                    }
                    className="add-to-cart-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          {restaurant.menu?.drinks && restaurant.menu.drinks.length > 0 && (
            <>
              <h2 className="meals-column-title" style={{ marginTop: "40px" }}>
                İçecekler
              </h2>
              <div className="meals-grid">
                {restaurant.menu.drinks.map((drink) => (
                  <div key={drink.drink_id} className="meal-card">
                    <div className="meal-info-side">
                      <div>
                        <h3 className="meal-name">{drink.name}</h3>
                        <p className="meal-description">Soğuk servis edilir</p>
                      </div>
                      <strong className="meal-price">
                        {drink.price.toFixed(2)} TL
                      </strong>
                    </div>
                    <div className="meal-image-side">
                      <img
                        src="https://images.unsplash.com/photo-1437419764061-2473afe69fc2?w=500"
                        alt={drink.name}
                        className="meal-img"
                      />
                      <button
                        onClick={() =>
                          addToCart(
                            { ...drink, id: drink.drink_id, restaurantId: restaurant.id },
                            restaurant.id
                          )
                        }
                        className="add-to-cart-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="cart-column">
          <div className="cart-box">
            <div className="cart-tabs-header">
              <div className="cart-tab-delivery">Restoran</div>
              <div className="cart-tab-takeaway">Gel Al</div>
            </div>
            <Basket />
          </div>
        </div>
      </div>
    </div>
  );
}