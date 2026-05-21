import React, { useState, useEffect, useRef } from "react";
import ProfileIcon from "./ProfileIcon";
import FavoritesIcon from "./FavoritesIcon";
import Language from "./Language";
import Basket from "./Basket";
import { ShoppingBag } from "lucide-react";

export default function UserActions() {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const basketRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (basketRef.current && !basketRef.current.contains(event.target)) {
        setIsBasketOpen(false); // أغلق السلة
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="user-actions-container" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <div className="action-item profile-icon">
        <ProfileIcon />
      </div>
      <div className="action-item language-icon">
        <Language />
      </div>
      <div className="action-item favorites-icon">
        <FavoritesIcon />
      </div>
      <div className="action-item basket-icon" style={{ position: "relative" }} ref={basketRef}>
        <div 
          onClick={() => setIsBasketOpen(!isBasketOpen)}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <ShoppingBag size={24} color="#2d2d2d" />
        </div>
        {isBasketOpen && (
          <div 
            style={{
              position: "absolute",
              top: "40px", 
              right: "0",  
              width: "320px",
              backgroundColor: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)", 
              borderRadius: "12px",
              padding: "15px",
              zIndex: 1000 
            }}
          >
            <Basket />
          </div>
        )}
      </div>
    </div>
  );
}