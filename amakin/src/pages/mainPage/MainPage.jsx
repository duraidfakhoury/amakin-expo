import { Outlet, } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import Navbar from "../../components/navbar/NavBar";
import "./mainPage.css"
import Footer from "../../components/footer/Footer";


const MainPage = ()=> {
    const Layout = () => {
        return (
          <div className="main">
            <Navbar/>
            <div className="container">
              <div className="menuContainer"><Menu/></div>
              <div className="contentContainer"><Outlet/></div>
            </div>
            <Footer/>
          </div>
        );
      }
      
      return <Layout/> 
}

export default MainPage ;