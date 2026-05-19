import React from "react";
import "./cardStyle.css";

export default function CardImage({ image }) {
  return (
    <div className="restaurant-card-image">
      <img src={image} alt="Restaurant" />
    </div>
  );
}