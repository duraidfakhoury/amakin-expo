import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";
import "./settings.css";
import "../../../styles/variables.css";
import ToggleSlider from "../../../components/toggleSlider/ToogleSlider";
import { useNavigate } from "react-router-dom";



const Settings = () => {
  
  const navigate = useNavigate();
  const { toggleTheme, theme } = useContext(ThemeContext);
  const logoutAction = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate("/");
  }
  return (
    <div className="settings">
        <div className="theme-option">
        <span>Dark Mode : </span>
        <ToggleSlider onToggle={toggleTheme} checked={theme === 'dark'} />
        </div>
        <div className="logout-option">
          <span>Log Out : </span>
          <button
          onClick={logoutAction}
          >log out </button>
        </div>

    </div>
  );
};

export default Settings;
