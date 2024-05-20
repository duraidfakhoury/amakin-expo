import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import "./login.css";
import { useState } from "react";
import Footer from "../../components/footer/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    navigate("/mainPage");
  };

  return (
    <div className="login">
      <div className="wraper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input type="text" placeholder="user name" required 
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          />
          <FaUser className="icon"/>
        </div>
        <div className="input-box">
          <input type="password" placeholder="password" required 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <FaLock className="icon"/>
        </div>
        <div className="remember-forget">
            <label ><input type="checkbox" />Remeber me</label>
        </div>
        <button type="submit">Send</button>
      </form>
      </div>
      <div className="footer"><Footer/></div>
    </div>
  );
};

export default Login;
