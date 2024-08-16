import { useNavigate } from "react-router-dom";
import "./home.css" ;
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home">
            <div className="boxx boxx1">
                <img src="/logo.svg" alt="" />
            </div>
            <div className="boxx boxx2">
                <button onClick={()=>navigate('exhibitions')}>exhibitions</button>
            </div>
            <div className="boxx boxx3">
                <button onClick={()=>navigate('createexhibition')}>create exhibition</button>
            </div>
            <div className="boxx boxx4">
                <button onClick={()=>navigate('categories')}>categories</button>
            </div>
            <div className="boxx boxx5"> 
                <button onClick={()=>navigate('SignUp')}>add admin</button>
            </div>
            
        </div>
    );
}

export default Home;