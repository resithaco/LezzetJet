import React from "react";
import TopRow from "./TopRow";
import BottomRow from "./BottomRow";
import "./navStyle.css";

export default function Navbar({ searchTerm, onSearchChange }) {
  return (
    <nav className="navbar-container">
      <TopRow /> 
      <BottomRow searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </nav>
  );
}