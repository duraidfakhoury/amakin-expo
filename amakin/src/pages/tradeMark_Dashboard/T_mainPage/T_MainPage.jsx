import { Outlet, } from "react-router-dom";
import Menu from "../../../components/menu/Menu";
import Navbar from "../../../components/navbar/NavBar";
import "./T_mainPage.css"
import Footer from "../../../components/footer/Footer";


const T_MainPage = (props)=> {
    const Layout = () => {
        return (
          <div className="t_main">
            <Navbar userName = {props.userData.name}/>
            <div className="container">
              <div className="menuContainer"><Menu/></div>
              <div className="contentContainer"><Outlet/></div>
            </div>
            <Footer data = "TradeMark Owner DashBoard"/>
          </div>
        );
      }
      
      return <Layout/> 
}

export default T_MainPage ;