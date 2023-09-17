import React from "react";

const Input = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter a GitHub username"
      className="px-4 py-2 border rounded-lg shadow-lg focus:outline-none focus:ring focus:border-blue-300"
    />
  );
};

export default Input;
