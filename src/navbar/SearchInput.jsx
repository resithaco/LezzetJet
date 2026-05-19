import React from "react";

export default function SearchInput({ searchTerm, onSearchChange }) {
  return (
    <input
      type="search"
      placeholder="Restoran veya yemek ya da yemek ara..."
      className="search-input-field"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}
