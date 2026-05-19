import { useState } from "react";
import Navbar from "./navbar/Navbar";
import CategoryMenu from "./CategoryMenu";
import SearchInput from "./navbar/SearchInput"; // تأكد من استيراده إذا لم يكن داخل Navbar
import RestaurantCard from "./RestaurantCard/RestaurantCard";
import restaurantData from "./data.json";
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
      (res.dishes &&
        res.dishes.some((dish) =>
          dish.toLowerCase().includes(searchTerm.toLowerCase()),
        ));

    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (categoryKey) => {
    setActiveCategory(categoryKey);
  };

  return (
    <div>
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />


      <CategoryMenu
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />

      <div className="cards-container" style={{ padding: "20px" }}>
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} data={restaurant} />
        ))}

        {filteredRestaurants.length === 0 && (
          <div
            style={{
              height: "20px",
              textAlign: "center",
              width: "100%",
              padding: "0px 0",
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
