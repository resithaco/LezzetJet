import React from "react";

export default function SearchInput({ searchTerm, onSearchChange }) {
  return (
      <input
        type="search"
        placeholder="Search for restaurants or dishes ..."
        className="search-input-field"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
   
  );
}