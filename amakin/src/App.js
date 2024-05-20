import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Login from "./pages/Login/login";

import logo from './logo.svg';
import './App.css';
import MainPage from "./pages/mainPage/MainPage";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import Products from "./pages/products/Products";

function App() {
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
        ]
    }
  ]);
  
  return (
    <RouterProvider router={router} />
  )}

export default App;
