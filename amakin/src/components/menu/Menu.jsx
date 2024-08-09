import { Link } from "react-router-dom";
import "./menu.css"
import { useState } from "react";

const Menu = (props) => {
    const [activeItem , setActiveItem ] = useState('');

    return <div className="menu">
        {
            props.menu.map((item)=>(
                <div className="item" key={item.id}>
                    <span className="title">{item.title}</span>
                    {
                        item.listItems.map((listItem)=>(
                            <Link to = {listItem.url} 
                                    className={`listItem ${activeItem===listItem.url ? `active` : ``}`} 
                                    key={listItem.id}
                                    onClick={() => setActiveItem(listItem.url)}
                                    >
                                <div className="icon">{listItem.icon}</div>
                                <span className="listItemTitle">{listItem.title}</span>
                            </Link>
                        ))
                    }
                </div>
            ))
        }
    </div>
}

export default Menu ;