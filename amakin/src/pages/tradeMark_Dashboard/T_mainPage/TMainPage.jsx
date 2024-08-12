import { Outlet, } from "react-router-dom";
import Menu from "../../../components/menu/Menu";
import Navbar from "../../../components/navbar/NavBar";
import "./TmainPage.css"
import Footer from "../../../components/footer/Footer";
import { Tmenu } from "../../../data";
import axios from "axios";
import { useEffect, useState } from "react";

const TMainPage = ()=> {
  const [userdata,setUserData] = useState([]);
  const getProfileData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/me', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const { status, data } = response;
        if (status === 200) {
            setUserData(data.data); // Correctly access the user data
        } else {
            console.log("Failed to fetch profile data");
        }
    } catch (error) {
      console.log("Failed to fetch profile data");
        console.error(error);
    }
  };
  useEffect(() => {
    getProfileData();
}, []);
    const Layout = () => {
        return (
          <div className="t_main">
            <Navbar userName = {userdata.name}s />
            <div className="container">
              <div className="menuContainer"><Menu menu={Tmenu}/></div>
              <div className="contentContainer"><Outlet/></div>
            </div>
            <Footer data = "TradeMark Owner DashBoard"/>
          </div>
        );
      }
      
      return <Layout/> 
}

export default TMainPage ;