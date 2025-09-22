import { useTheme } from "../hooks/ThemeContext.jsx";
import "./ThemeToggleButton.scss"
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

function ThemeToggleButton() {
  const { themeName, toggleTheme } = useTheme();
  const isDark = themeName === "dark";



  return <label className="switch" htmlFor="switch">
    <input type="checkbox" onClick={toggleTheme} />

    <span className="thumb">
      {isDark ? (
        <BsFillSunFill className="icon-sunFill" />

      ) : (
        <BsFillMoonStarsFill className="icon-starFill" />
      )}
    </span>

  </label>

}

export default ThemeToggleButton;
