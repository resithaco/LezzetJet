import { useState } from "react";
import Navbar from "./navbar/Navbar";
import CategoryMenu from "./CategoryMenu";
import RestaurantCard from "./RestaurantCard/RestaurantCard";
import restaurantData from "./data.json";
import QRCodeCard from "./QRCodeCard";
import "./Dashboard.css";
import "./RestaurantCard/cardStyle.css";

function Dashboard() {
  const categories = [
    { key: "all", label: "Tümü" },
    { key: "burger", label: "Burger" },
    { key: "pizza", label: "Pizza" },
    { key: "doner", label: "Döner" },
    { key: "kebap", label: "Kebap" },
    { key: "tatli", label: "Tatlı" },
    { key: "icecek", label: "İçecek" },
  ];
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const allRestaurants = restaurantData.restaurants;
  const filteredRestaurants = allRestaurants.filter((res) => {
    const matchesCategory =
      activeCategory === "all" || res.category === activeCategory;
    const matchesSearch =
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (res.menu?.meals &&
        res.menu.meals.some((meal) =>
          meal.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )) ||
      (res.menu?.drinks &&
        res.menu.drinks.some((drink) =>
          drink.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ));
    return matchesCategory && matchesSearch;
  });
  const handleCategoryClick = (categoryKey) => {
    setActiveCategory(categoryKey);
  };
  return (
    <div className="dashboard-layout">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="cards-container">
        <div className="dashboard-category-section">
          <CategoryMenu
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>
        <div className="dashboard-grid">
          <div className="restaurants-grid">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} data={restaurant} />
            ))}
          </div>
          <div className="fixed-qr-sidebar">
            <QRCodeCard
              url={window.location.origin}
              url="https://resithaco.github.io/LezzetJet/"
            />
          </div>
        </div>
        {filteredRestaurants.length === 0 && (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              padding: "40px 0",
              color: "#666",
            }}
          >
            <p style={{ fontSize: "16px", margin: 0 }}>
              Aradığınız kriterlere uygun restoran bulunamadı.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
