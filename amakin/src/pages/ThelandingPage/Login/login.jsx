import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import "./login.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password
    }
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/user/store',
        loginData,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      )
      const { status, data } = response;
      if (status === 200) {
        console.log('Login successful:', data);
        const { token, data: userData } = data;
        
        // Store the token in local storage
        localStorage.setItem('token', token);
        
        // Check the user's role and navigate accordingly
        if (userData.role === 'admin') {
          navigate('/mainPage');
        } else if (userData.role === 'trademark_owner') {
          navigate('/T_mainPage');
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
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="inputbox">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
