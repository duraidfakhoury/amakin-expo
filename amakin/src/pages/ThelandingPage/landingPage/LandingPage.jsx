import { Outlet } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import "./landingPage.css" ;
const LandingPage = () => {
  return (
    <div className="landingPage">
        <Header />
        <Outlet />
        <Footer className ="footer" data = "@all Rights Reserved"/>
    </div>
  )
}

export default LandingPage
