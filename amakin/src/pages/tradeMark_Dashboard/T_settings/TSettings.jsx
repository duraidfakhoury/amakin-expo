import { ThemeContext } from "../../../context/ThemeContext";
import { useContext, useState } from "react";
import "./Tsettings.css";
import "../../../styles/variables.css";
import ToggleSlider from "../../../components/toggleSlider/ToogleSlider";
import { useNavigate } from "react-router-dom";
import Add from "../../../components/add/Add";

const changePassword_columns =[
  {field: "currentPassword",
  type: "string",
  headerName: "Current Password",},
  {field: "newPassword",
  type: "password",
  headerName: "New Password",},
  {field: "confirmNewPassword",
  type: "password",
  headerName: "Confirm New Password",},

]

const TSettings = () => {
  
  const navigate = useNavigate();
  const { toggleTheme, theme } = useContext(ThemeContext);
  const [new_password , setNew_password] = useState(false) ;
  const logoutAction = (e) => {
    e.preventDefault();
    navigate("/");
  }
  return (
    <div className="t_settings">
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
        <div className="changePassword-option">
          <span>Change password : </span>
          <button
          onClick={()=>setNew_password(true)}
          >change</button>
          {new_password  && <Add  slug = 'new password' columns={changePassword_columns} setOpen = {setNew_password}/>}
        </div>
    </div>
  );
};

export default TSettings;
