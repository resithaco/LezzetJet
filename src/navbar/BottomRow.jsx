import React from "react";
import CategoryFilters from "./CategoryFilters";
import SearchWrapper from "./SearchWrapper";

export default function BottomRow({ searchTerm, onSearchChange }) {
  return (
    <div className="bottom-row-container">
      <CategoryFilters/>
      <SearchWrapper searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </div>
  );
}