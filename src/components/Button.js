import React from "react";

const Button = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
    >
      Find Non-Followers
    </button>
  );
};

export default Button;
