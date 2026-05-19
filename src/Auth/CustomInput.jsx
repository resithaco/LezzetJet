import React from "react";
const CustomInput = ({ type, placeholder, value, onchange }) => {
  return (
    <div className="input-group">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
      />
    </div>
  );
};
export default CustomInput;
