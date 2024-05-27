import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Login from "./pages/Login/login";
import './App.css';
import MainPage from "./pages/mainPage/MainPage";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import Products from "./pages/products/Products";
import Settings from "./pages/settings/Settings";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";

function App() {
  const {theme} = useContext(ThemeContext);
  const router = createBrowserRouter([
    {
      path : "",
      element : <Login/>
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
