import { useTheme } from "../hooks/ThemeContext.jsx";

function ThemeToggleButton() {
  const { themeName, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Mudar para {themeName === "light" ? "dark" : "light"} mode</button>;
}

export default ThemeToggleButton;
