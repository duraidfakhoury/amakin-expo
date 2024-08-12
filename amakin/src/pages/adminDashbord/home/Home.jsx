import { useNavigate } from "react-router-dom";
import "./home.css" ;
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home">
            <div className="box box1">
                <img src="/logo.svg" alt="" />
            </div>
            <div className="box box2">
                <button onClick={()=>navigate('events')}>events</button>
            </div>
            <div className="box box3">
                <button onClick={()=>navigate('createEvent')}>create event</button>
            </div>
            <div className="box box4">
                <button onClick={()=>navigate('categories')}>categories</button>
            </div>
            <div className="box box5"> 
                <button onClick={()=>navigate('SignUp')}>add admin</button>
            </div>
            
        </div>
    );
}

export default Home;