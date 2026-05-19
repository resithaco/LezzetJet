import React from "react";
import { Heart } from "lucide-react";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  return (
    <div className="favorites-page-container">
      <h1>Favorilerim</h1>

      <div className="empty-state">
        <div className="icon-wrapper">
          <div className="zero-badge">0</div>
        </div>

        <h3>Favori mağazanız yok</h3>
        <p>Tüm favorilerinizi burada görebilirsiniz.</p>

        <div className="heart-dot">
          <Heart size={14} fill="#f91157" color="#f91157" />
        </div>

        <button className="explore-btn" onClick={() => window.history.back()}>
          Keşfet
        </button>
      </div>
    </div>
  );
}
