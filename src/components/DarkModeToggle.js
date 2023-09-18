import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div
      className={`mode-toggle ${isDarkMode ? "dark" : ""}`}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </div>
  );
};

export default DarkModeToggle;
