import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeContext } from "./context/ThemeContext";
import { useContext, useState } from "react";
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
import Users from "./pages/adminDashbord/users/Users";
import User from "./pages/adminDashbord/user/User";
import Settings from "./pages/adminDashbord/settings/Settings";
import TMainPage from "./pages/tradeMark_Dashboard/T_mainPage/TMainPage";
import THome from "./pages/tradeMark_Dashboard/T_home/THome";
import TProducts from "./pages/tradeMark_Dashboard/T_products/TProducts";
import TProduct from "./pages/tradeMark_Dashboard/T_product/TProduct";
import TRepresentatives from "./pages/tradeMark_Dashboard/T_Representatives/TRepresentatives";
import TUser from "./pages/tradeMark_Dashboard/T_user/TUser";
import TSettings from "./pages/tradeMark_Dashboard/T_settings/TSettings";
import TEvents from "./pages/tradeMark_Dashboard/T_events/TEvents";
import Profile from "./pages/adminDashbord/profile/Profile";
import { singleUser } from "./data";
import CreateEvente from "./pages/adminDashbord/createEvent/CreateEvente";
import TParticipate from "./pages/tradeMark_Dashboard/T_patricipate/TParticipate";
import Categories from "./pages/adminDashbord/categories/Categories";
import RouteChangeTracker from "./components/routeChangeTracker/RouteChangeTracker";
import Verify from "./pages/ThelandingPage/verify/Verify";

function App() {
  const { theme } = useContext(ThemeContext);
  const [loggedData, setLoggedData] = useState();
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
      setLoggedData(userData);
      return response;
    } else return response;
  };

  const router = createBrowserRouter([
    {
      path: "",
      element: <RouteChangeTracker />,
      children: [
        {
          path: "",
          element: <LandingPage />,
          children: [
            {
              path: "verify-email",
              element: <Verify />
            },
            {
              path: "Login",
              element: <Login onLogin={onLogin} />,
            },
            {
              path: "JoinUs",
              element: <JoinUs />,
            },
            {
              path: "ContactUs",
              element: <ContactUs />,
            },
            {
              path: "AboutUs",
              element: <AboutUs />,
            },
          ],
        },
        {
          path: "/mainPage",
          element: <MainPage userData={loggedData} />,
          children: [
            {
              path: "",
              element: <Home />,
            },
            {
              path: "profile",
              element: <Profile {...singleUser} />,
            },
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "events",
              element: <Events />,
            },
            {
              path: "categories",
              element: <Categories />,
            },
            {
              path: "users/:id",
              element: <User />,
            },
            {
              path: "Event/:eventId",
              element: <Event />,
            },
            {
              path: "settings",
              element: <Settings />,
            },
            {
              path: "SignUp",
              element: <SignUp />,
            },
            {
              path: "createEvent",
              element: <CreateEvente />,
            },
          ],
        },
        {
          path: "/TmainPage",
          element: <TMainPage userData={loggedData} />,
          children: [
            {
              path: "",
              element: <THome />,
            },
            {
              path: "profile",
              element: <TUser userData={loggedData} />,
            },
            {
              path: "events",
              element: <TEvents />,
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
              path: "users/:id",
              element: <TUser />,
            },
            {
              path: "products/:productId",
              element: <TProduct />,
            },
            {
              path: "settings",
              element: <TSettings />,
            },
            {
              path: "participate",
              element: <TParticipate />,
            },
          ],
        },
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
