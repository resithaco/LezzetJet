import React from "react";
import { Star } from "lucide-react";
import { Bike } from "lucide-react";

export default function CardInfo({
  name,
  rating,
  reviews,
  priceRange,
  minBasket,
  deliveryFee,
  promoText,
}) {
  return (
    <div className="restaurant-card-info">
      <div className="card-info-header">
        <h3 className="restaurant-name">{name}</h3>
        <div className="rating-badge">
          <Star size={14} fill="#ff0066" stroke="none" />
          <div className="rating-text">
            <span className="rating">{rating}</span>
            <span className="reviews">({reviews})</span>
          </div>
        </div>
      </div>
      <p className="restaurant-details">
        {priceRange} • {minBasket}
      </p>
      <div className="delivery-row">
        <span className="delivery-icon"><Bike size={12} /></span>
        <span className="delivery-text">Teslimat: {deliveryFee}</span>
      </div>
      {promoText && <div className="promo-text">{promoText}</div>}
    </div>
  );
}
