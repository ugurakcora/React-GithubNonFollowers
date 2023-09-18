const setDarkModePreference = () => {
  const isDarkModeEnabled =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  localStorage.setItem("darkMode", JSON.stringify(isDarkModeEnabled));
};

// Tarayıcı yeniden yüklendiğinde, dark mode tercihini güncelle
window.addEventListener("load", setDarkModePreference);
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", setDarkModePreference);
