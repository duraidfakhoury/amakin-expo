import { Outlet, } from "react-router-dom";
import Menu from "../../../components/menu/Menu";
import Navbar from "../../../components/navbar/NavBar";
import "./mainPage.css"
import Footer from "../../../components/footer/Footer";
import { menu } from "../../../data";
import { useEffect, useState } from "react";
import axios from "axios";



const MainPage = ()=> {
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
      console.log(userdata);
        return (
          <div className="main">
            <Navbar userName = {userdata.name}/>
            <div className="container">
              <div className="menuContainer"><Menu menu={menu}/></div>
              <div className="contentContainer"><Outlet/></div>
            </div>
            <Footer data = "Expo Owner Dash Board"/>
          </div>
        );
      }
      
      return <Layout/> 
}

export default MainPage ;