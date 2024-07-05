import "./participantRegister.css" ;
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
const ParticipantRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (email && password && name) {
        console.log('Register Participant', { email, password, name });
        // Implement registration logic for participant
      } 
    };
  
    return (
      <div className="participantRegister">
        <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input type="text" placeholder="user name" required 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
          <FaUser className="icon"/>
        </div>
        <div className="input-box">
          <input type="text" placeholder="Email" required 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <MdEmail className="icon"/>
        </div>
        <div className="input-box">
          <input type="password" placeholder="password" required 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <FaLock className="icon"/>
        </div>
        <div className="input-box">
          <input type="password" placeholder="password" required 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <FaLock className="icon"/>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      </div>
    );
  };

export default ParticipantRegister
