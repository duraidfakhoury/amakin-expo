import {Link , useNavigate , useLocation } from "react-router-dom";
import "./header.css" ; 
import { headerNav } from "../../data";
import { useState } from "react";


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem , setActiveItem ] = useState('');
    const loginAction = (e)=>{
        e.preventDefault();
        navigate("Login")
        setActiveItem('Login');
    }

  return (
    <div className="header">
      <div className="title">
        <img src="/logo.svg" alt="" />
        <span>AMAKIN EXPO</span>
      </div>
      <div className="header-nav">
      {
            headerNav.map((item)=>(
                <div className={`nav-item ${activeItem===item.url ? `active` : ``}`}
                onClick={() => setActiveItem(item.url)}
                 key={item.id}>
                    <Link to = {item.url} >
                      <span className="listItemTitle">{item.title}</span>
                    </Link>
                </div>
            ))
        }
      </div>
      <button className={`login-btn ${activeItem==="Login" ? `active` : ``}`} 
        onClick={loginAction}
        >Login</button>
    </div>
  )
}

export default Header
