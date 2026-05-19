import React from "react";
const CustomInput = ({ type, placeholder, value, onChange }) => {
  return (
    <div className="input-group">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default CustomInput;
