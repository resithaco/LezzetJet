import React from "react";
import { Bike } from "lucide-react";

export default function CardFooter({ deliveryFee }) {
  return (
    <div className="restaurant-card-footer">
      <div className="delivery-info">
        <Bike size={16} color="#2f3542" />
        <span>Delivery: {deliveryFee}</span>
      </div>
      <div className="promo-tag">Free items available</div>
    </div>
  );
}
