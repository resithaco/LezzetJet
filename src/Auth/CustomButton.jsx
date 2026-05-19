import React from "react";
const CustomButton = ({ label, onClick, className = "" }) => {
  return (
    <button onclick={onClick} className={className}>
      {label}
    </button>
  );
};
export default CustomButton;
