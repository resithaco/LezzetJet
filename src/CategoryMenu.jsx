import React from "react";

const CategoryMenu = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <div className="categories-container" style={{ padding: "20px" }}>
      <div
        className="categories-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            color: "#2d2d2d",
          }}
        >
          Kategoriler
        </h2>
        <button
          onClick={() => onCategoryClick("all")}
          style={{
            background: "none",
            border: "none",
            color: "#ff385c",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Filtreyi temizle
        </button>
      </div>
      <div
        id="categoryRow"
        className="category-row"
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: "5px",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`category-chip ${cat.key === activeCategory ? "active" : ""}`}
            onClick={() => onCategoryClick(cat.key)}
            style={{
              padding: "10px 24px",
              borderRadius: "20px",
              border: "1px solid #e0e0e0",
              backgroundColor:
                cat.key === activeCategory ? "#ff385c" : "#ffffff",
              color: cat.key === activeCategory ? "#ffffff" : "#2d2d2d",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontSize: "14px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <strong>{cat.label}</strong>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
