import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import axios from "axios";

const RouteChangeTracker = () => {
  let location = useLocation();
  const navigate = useNavigate()
  const [loggedData, setLoggedData] = useState();

  const me = async () => {
    console.log('me')
  
    await axios.get(
      "http://127.0.0.1:8000/api/me",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
    ).then(
      (response) => {
        const { data } = response.data
        setLoggedData(data)
        if(data.email_verified_at === null){
          navigate('/verify-email')
        }
        else if(!data.accepted_by_admin){
          navigate('/wait_for_verify')
        }
      }
    ).catch(async () => {
      const refreshResponse = await axios.get(
        "http://127.0.0.1:8000/api/user/refresh-token",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
          },
        }
      )
      const { status: s, data: d } = refreshResponse;
      if(s === 401){
        navigate('Login')
      }else{
        localStorage.setItem("token", d.token.accessToken);
      }
    })
  } 

  useEffect(() => {

    if(
      location.pathname.includes('mainPage')
    ){
      me()
    }

  }, [location]);

  return (
    <Outlet />
  );
};

export default RouteChangeTracker;