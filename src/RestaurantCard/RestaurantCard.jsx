import React from "react";
import { useNavigate } from "react-router-dom"; 
import CardImage from "./CardImage";
import CardInfo from "./CardInfo";

export default function RestaurantCard({ data }) {
  const navigate = useNavigate(); 

  const handleCardClick = () => {
    navigate(`/restaurant/${data.id}`, { state: { restaurant: data } });
  };
  return (
    <div className="restaurant-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <CardImage
        image={data.image}
        discount={data.discount}
        deliveryTime={data.delivery_time}
      />
      <CardInfo
        name={data.name}
        rating={data.rating ? data.rating.toString() : "0.0"}
        reviews={`${data.reviews_count}+`}
        priceRange={data.price_range}
        minBasket={data.min_basket}
        deliveryFee={
          data.is_free_delivery ? "Ücretsiz" : `${data.delivery_fee}TL`
        }
        promoText={data.promo_text}
      />
    </div>
  );
}