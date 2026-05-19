import React from "react";
import { Utensils, Store } from 'lucide-react'; 
import RestaurantLink from "./RestaurantLink";
import MarketLink from "./MarketLink";

export default function CategoryFilters() {
  return (
    <div className="category-filters">
      <div className="category-link">
        <div className="icon-container">
          <Utensils size={16} strokeWidth={2.5} className="icon-style" />
        </div>
        <RestaurantLink />
      </div>
      <div className="category-link">
        <div className="icon-container">
          <Store size={16} strokeWidth={2.5} className="icon-style" />
        </div>
        <MarketLink />
      </div>
    </div>
  );
}