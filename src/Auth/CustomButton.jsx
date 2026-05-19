import React from "react";
const CustomButton = ({ label, onclick, className = "" }) => {
  return (
    <button onclick={onclick} className={className}>
      {label}
    </button>
  );
};
export default CustomButton;
