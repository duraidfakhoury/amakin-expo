import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import "./settings.css";
import "../../styles/variables.css";
import ToggleSlider from "../../components/toggleSlider/ToogleSlider";


const Settings = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <div className="settings">
        <div className="themeOption">
        <span>Dark Mode : </span>
        <ToggleSlider onToggle={toggleTheme} checked={theme === 'dark'} />
        </div>
    </div>
  );
};

export default Settings;
