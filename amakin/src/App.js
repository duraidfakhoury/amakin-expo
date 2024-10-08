import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import axios from "axios";
import LandingPage from "./pages/ThelandingPage/landingPage/LandingPage";
import Login from "./pages/ThelandingPage/Login/login";
import SignUp from "./pages/adminDashbord/signUp/SignUp";
import JoinUs from "./pages/ThelandingPage/JoinUs/JoinUs";
import ContactUs from "./pages/ThelandingPage/contactUs/ContactUs";
import AboutUs from "./pages/ThelandingPage/aboutUs/AboutUs";
import MainPage from "./pages/adminDashbord/mainPage/MainPage";
import Home from "./pages/adminDashbord/home/Home";
import Events from "./pages/adminDashbord/events/Events";
import Event from "./pages/adminDashbord/event/Event";
import Settings from "./pages/adminDashbord/settings/Settings";
import TMainPage from "./pages/tradeMark_Dashboard/T_mainPage/TMainPage";
import THome from "./pages/tradeMark_Dashboard/T_home/THome";
import TProducts from "./pages/tradeMark_Dashboard/T_products/TProducts";
import TProduct from "./pages/tradeMark_Dashboard/T_product/TProduct";
import TRepresentatives from "./pages/tradeMark_Dashboard/T_Representatives/TRepresentatives";
import TSettings from "./pages/tradeMark_Dashboard/T_settings/TSettings";
import TEvents from "./pages/tradeMark_Dashboard/T_events/TEvents";
import Profile from "./pages/adminDashbord/profile/Profile";
import CreateEvente from "./pages/adminDashbord/createEvent/CreateEvente";
import TParticipate from "./pages/tradeMark_Dashboard/T_patricipate/TParticipate";
import Categories from "./pages/adminDashbord/categories/Categories";
import TEvent from "./pages/tradeMark_Dashboard/Tevent/TEvent";
import TProfile from "./pages/tradeMark_Dashboard/T_profile/TProfile";
import RouteChangeTracker from "./components/routeChangeTracker/RouteChangeTracker";
import Verify from "./pages/verify/Verify";
import Wait from "./pages/wait/Wait";
import Transfer from "./pages/adminDashbord/transfer/Transfer";
import Main from "./pages/ThelandingPage/main/Main";
import TradeMarks from "./pages/adminDashbord/tradeMarks/TradeMarks";
import TradeMark from "./pages/adminDashbord/tradeMark/TradeMark";

function App() {
  const { theme } = useContext(ThemeContext);
  const onLogin = async (loginData) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/user/store",
      loginData,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const { status, data } = response;
    if (status === 200) {
      const { token, data: userData } = data;
      localStorage.setItem("token", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
      return response;
    } else return response;
  };

  const router = createBrowserRouter([
    {
      path: "",
      element: <RouteChangeTracker />,
      children: [
        {
          path: "verify-email",
          element: <Verify />
        },
        {
          path: "wait_for_verify",
          element: <Wait />
        },
        {
          path : "" ,
          element : <LandingPage />,
          children : [
            {
              path : "Login",
              element : <Login onLogin={onLogin}/>
            },
            {
              path : "JoinUs",
              element :<JoinUs/>
            },
            {
              path : "ContactUs" ,
              element : <ContactUs />
            },
            {
              path : "AboutUs" ,
              element : <AboutUs />
            },
            {
              path :"",
              element:<Main/>
            }
            
          ]
        },
        {
          path : "/mainPage",
          element: <MainPage/>,
          children :
            [
              {
                path: "",
                element: <Home />,
              },
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "exhibitions",
                element: <Events />,
              },
              {
                path: "tradeMarks",
                element: <TradeMarks />,
              },
              {
                path: "tradeMarks/:tradeMarkId",
                element: <TradeMark />,
              },
              {
                path: "categories",
                element: <Categories />,
              },
              {
                path: "exhibition/:exhibitionId",
                element: <Event />,
              },
              {
                path : "settings",
                element :  <Settings />
              },
              {
                path : "SignUp",
                element :<SignUp />
              },
              {
                path : "createexhibition",
                element : <CreateEvente/>
              }
            ]
        }
        ,{
          path : "/TmainPage",
          element : <TMainPage />,
          children :
            [
              {
                path: "",
                element: <THome />,
              },
              {
                path: "profile",
                element: <TProfile  />,
              },
              {
                path: "exhibitions",
                element: <TEvents />,
              },
              {
                path: "exhibition/:exhibitionId",
                element: <TEvent />,
              },
              {
                path: "representatives",
                element: <TRepresentatives />,
              },
              {
                path: "products",
                element: <TProducts />,
              },
              {
                path: "products/:productId",
                element: <TProduct />,
              },
              {
                path : "settings",
                element :  <TSettings />
              },
              {
                path : "participate",
                element : <TParticipate/>
              }
            ]
        }
      ]
    },
    {
      path : "/mainPage",
      element: <MainPage/>,
      children :
        [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "exhibitions",
            element: <Events />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "exhibition/:exhibitionId",
            element: <Event />,
          },
          {
            path : "settings",
            element :  <Settings />
          },
          {
            path : "SignUp",
            element :<SignUp />
          },
          {
            path : "createexhibition",
            element : <CreateEvente/>
          },
          {
            path : "transfer",
            element : <Transfer/>
          }
        ]
    }
    ,{
      path : "/TmainPage",
      element : <TMainPage />,
      children :
        [
          {
            path: "",
            element: <THome />,
          },
          {
            path: "profile",
            element: <TProfile />,
          },
          {
            path: "exhibitions",
            element: <TEvents />,
          },
          {
            path: "exhibition/:exhibitionId",
            element: <TEvent />,
          },
          {
            path: "representatives",
            element: <TRepresentatives />,
          },
          {
            path: "products",
            element: <TProducts />,
          },
          {
            path: "products/:productId",
            element: <TProduct />,
          },
          {
            path : "settings",
            element :  <TSettings />
          },
          {
            path : "participate",
            element : <TParticipate/>
          }
        ]
    }
  ]);

  return (
    <div data-theme={theme}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
