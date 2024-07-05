import { Outlet, } from "react-router-dom";
import Menu from "../../../components/menu/Menu";
import Navbar from "../../../components/navbar/NavBar";
import "./mainPage.css"
import Footer from "../../../components/footer/Footer";


const MainPage = (props)=> {
    const Layout = () => {
      console.log(props.userData);
        return (
          <div className="main">
            <Navbar userName = {props.userData.name}/>
            <div className="container">
              <div className="menuContainer"><Menu/></div>
              <div className="contentContainer"><Outlet/></div>
            </div>
            <Footer data = "Expo Owner Dash Board"/>
          </div>
        );
      }
      
      return <Layout/> 
}

export default MainPage ;