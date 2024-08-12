import "./navBar.css"
import { IoIosSearch } from "react-icons/io";
import { AiOutlineAppstore } from "react-icons/ai";
import { IoMdExpand } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
const Navbar = (props) => {
    return <div className="navBar">
        <div className="logo">
            <img src="/logo.svg" alt="" />
            <span>AMAKIN EXPO</span>
        </div>
        <div className="icons">
            
            <div className="user">
                <img src={`http://127.0.0.1:8000${props.userLogo}`} alt="" />
                <span>{props.userName}</span>
            </div>
        </div>
    </div>
}

export default Navbar ;