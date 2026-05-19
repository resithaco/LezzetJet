import React from "react";
import { Search } from 'lucide-react';
import SearchInput from "./SearchInput";

export default function SearchWrapper({ searchTerm, onSearchChange }) {
  return (
    <div className="search-wrapper">
      <div className="search-icon">
        <Search size={22} strokeWidth={2} />
      </div>
      <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </div>
  );
}