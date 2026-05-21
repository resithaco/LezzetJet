import React from "react";
import "./CategoryMenu.css";

const CategoryMenu = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <div className="categories-container">
      <div className="categories-header">
        <h2>Kategoriler</h2>
        <button
          onClick={() => onCategoryClick("all")}
          className="clear-filter-btn"
        >
          Filtreyi temizle
        </button>
      </div>
      <div id="categoryRow" className="category-row">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`category-chip ${cat.key === activeCategory ? "active" : ""}`}
            onClick={() => onCategoryClick(cat.key)}
          >
            <strong>{cat.label}</strong>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;