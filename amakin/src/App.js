import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './App.css';
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import LandingPage from "./pages/ThelandingPage/landingPage/LandingPage";
import Login from "./pages/ThelandingPage/Login/login";
import SignUp from "./pages/adminDashbord/signUp/SignUp";
import JoinUs from "./pages/ThelandingPage/JoinUs/JoinUs";
import OurServices from "./pages/ThelandingPage/ourServices/OurServices";
import AboutUs from "./pages/ThelandingPage/aboutUs/AboutUs";
import MainPage from "./pages/adminDashbord/mainPage/MainPage";
import Home from "./pages/adminDashbord/home/Home";
import Products from './pages/adminDashbord/products/Products';
import Product from "./pages/adminDashbord/product/Product";
import Users from "./pages/adminDashbord/users/Users";
import User from "./pages/adminDashbord/user/User";
import Settings from "./pages/adminDashbord/settings/Settings";
import T_MainPage from "./pages/tradeMark_Dashboard/T_mainPage/T_MainPage";
import T_Home from "./pages/tradeMark_Dashboard/T_home/T_Home";
import T_Products from './pages/tradeMark_Dashboard/T_products/T_Products';
import T_Product from "./pages/tradeMark_Dashboard/T_product/T_Product";
import T_Users from "./pages/tradeMark_Dashboard/T_users/T_Users";
import T_User from "./pages/tradeMark_Dashboard/T_user/T_User";
import T_Settings from "./pages/tradeMark_Dashboard/T_settings/T_Settings";
function App() {
  const {theme} = useContext(ThemeContext);
  const router = createBrowserRouter([
    {
      path : "" ,
      element : <LandingPage />,
      children : [
        {
          path : "Login",
          element : <Login/>
        },
        {
          path : "JoinUs",
          element :<JoinUs/>
        },
        {
          path : "OurServices" ,
          element : <OurServices />
        },
        {
          path : "AboutUs" ,
          element : <AboutUs />
        },
        
      ]
    },
    {
      path : "/mainPage",
      element : <MainPage />,
      children :
        [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "users/:id",
            element: <User />,
          },
          {
            path: "products/:id",
            element: <Product />,
          },
          {
            path : "settings",
            element :  <Settings />
          },
          {
            path : "SignUp",
            element :<SignUp />
          },
        ]
    }
    ,{
      path : "/T_mainPage",
      element : <T_MainPage />,
      children :
        [
          {
            path: "",
            element: <T_Home />,
          },
          {
            path: "users",
            element: <T_Users />,
          },
          {
            path: "products",
            element: <T_Products />,
          },
          {
            path: "users/:id",
            element: <T_User />,
          },
          {
            path: "products/:id",
            element: <T_Product />,
          },
          {
            path : "settings",
            element :  <T_Settings />
          }
        ]
    }
  ]);
  
  return (
    <div data-theme = {theme}>
      <RouterProvider router={router} />
    </div>
  )}

export default App;
