import React from "react";
import BrandLogo from "./BrandLogo";
import LocationBox from "./LocationBox";
import UserActions from "./UserActions";
import "./TopRow.css";
export default function TopRow() {
  return (
    <>
      <div className="top-row-container">
        <BrandLogo />
        <LocationBox />
        <UserActions />
      </div>
    </>
  );
}
