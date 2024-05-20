import "./navBar.css"

const Navbar = () => {
    return <div className="navBar">
        <div className="logo">
            <img src="/logo.svg" alt="" />
            <span>AMAKIN EXPO</span>
        </div>
        <div className="icons">
            <img src="/search.svg" alt="" className="icon" />
            <img src="/app.svg" alt="" className="icon" />
            <img src="/expand.svg" alt="" className="icon" />
            <div className="notifications">
                 <img src="/notifications.svg" alt="" />
                 <span>1</span>
            </div>
            <div className="user">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLM-WehJQ66IB98MKjKi4UhFhrrxk9ht75-KFuHAQnaI3_jqiDUS3rIPiNBM_jRlqA9Lc&usqp=CAU" alt="" />
                <span>duraid</span>
            </div>
        </div>
    </div>
}

export default Navbar ;