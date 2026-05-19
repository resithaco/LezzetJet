import React from "react";
import "./cardStyle.css";

// 💡 التعديل هنا: قمنا بإضافة discount و deliveryTime لتتمكن الدالة من قراءتهما
export default function CardImage({ image, discount, deliveryTime }) {
  return (
    <div className="restaurant-card-image" style={{ position: "relative" }}>
      <img src={image} alt="Restaurant" />

      {discount && (
        <div
          style={{
            position: "absolute",
            top: "5px",
            left: "0",
            backgroundColor: "#ff385c",
            color: "#fff",
            padding: "5px 5px",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            fontWeight: "bold",
            fontSize: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          {discount}
        </div>
      )}

      {deliveryTime && (
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
            backgroundColor: "#fff",
            color: "#2d2d2d",
            padding: "4px 4px",
            borderRadius: "15px",
            fontWeight: "bold",
            fontSize: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          }}
        >
          {deliveryTime}
        </div>
      )}
    </div>
  );
}
