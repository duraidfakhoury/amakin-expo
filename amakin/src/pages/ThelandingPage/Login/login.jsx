import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import InputField from "../../../components/inputField/InputField";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password
    };
    try {
      const response = await props.onLogin(loginData); // Await the promise
      const { status, data } = response;
      if (status === 200) {
        const { data: userData } = data;
        // Check the user's role and navigate accordingly
        if (userData.role === 'admin') {
          navigate('/mainPage');
        } else if (userData.role === 'trademark_owner') {
          navigate('/TmainPage');
        }
        setEmail('');
        setPassword('');
      } else {
        setError('Unexpected status code: ' + status);
      }
    } catch (error) {
      if (error.response) {
        setError('There was an error logging in: ' + (error.response.data.message || error.message));
      } else if (error.request) {
        setError('No response received: ' + error.message);
      } else {
        setError('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="login_wraper">
        <h1>Login</h1>
        <img src="../undraw_login_re_4vu2.svg" alt="" />
        <form onSubmit={handleSubmit}>
          <div className="inputbox">
          <InputField
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className="inputbox">
          <InputField
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          {error && <div className="error">{error}</div>}
          <button className="loginSubmit" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
