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
            <div className="icon"><IoIosSearch/></div>
            <div className="icon"><AiOutlineAppstore/></div>
            <div className="icon"><IoMdExpand/></div>
            <div className="notifications">
            <div className="icon"><IoNotificationsOutline/></div>
                 <span>1</span>
            </div>
            <div className="user">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLM-WehJQ66IB98MKjKi4UhFhrrxk9ht75-KFuHAQnaI3_jqiDUS3rIPiNBM_jRlqA9Lc&usqp=CAU" alt="" />
                <span>{props.userName}</span>
            </div>
        </div>
    </div>
}

export default Navbar ;