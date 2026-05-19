import React, { useState, useEffect, useRef } from "react";
import ProfileIcon from "./ProfileIcon";
import FavoritesIcon from "./FavoritesIcon";
import Language from "./Language";
import Basket from "./Basket";
import { ShoppingBag } from "lucide-react";

export default function UserActions() {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  
  // 1. إنشاء مرجع (Ref) لربطه بحاوية السلة
  const basketRef = useRef(null);

  // 2. استخدام useEffect للاستماع لنقرات الماوس في الصفحة
  useEffect(() => {
    function handleClickOutside(event) {
      // إذا كانت السلة مفتوحة، والنقرة حدثت خارج العنصر الذي يحمل المرجع (basketRef)
      if (basketRef.current && !basketRef.current.contains(event.target)) {
        setIsBasketOpen(false); // أغلق السلة
      }
    }

    // إضافة مستمع الحدث عند فتح الصفحة
    document.addEventListener("mousedown", handleClickOutside);
    
    // تنظيف مستمع الحدث عند إغلاق المكون لتجنب مشاكل الذاكرة
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // مصفوفة فارغة تعني أن هذا التأثير يعمل مرة واحدة عند تحميل المكون

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
      
      {/* 3. ربط المرجع (basketRef) بالحاوية الرئيسية للسلة والأيقونة */}
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