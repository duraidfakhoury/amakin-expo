import { Outlet } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import "./landingPage.css" ;
const LandingPage = () => {
  return (
    <div className="landingPage">
        <Header />
        <Outlet />
        <Footer className ="footer" data = "made with love"/>
    </div>
  )
}

export default LandingPage
