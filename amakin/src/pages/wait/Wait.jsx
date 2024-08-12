import React from 'react';
import './Wait.css';
import { useNavigate } from 'react-router-dom';

const Wait = () => {
  const navigate = useNavigate()
  return (
    <div className="wait-container">
      <div className="wait-content">
        <div className="spinner"></div>
        <h2>Your account is under review by admin</h2>
        <p>Your account is being reviewed by an admin. Please wait for verification.</p>
        <p>We will notify you once your account has been approved.</p>
        <div className="go-back">
          <p>go back to the login page</p>
          <button onClick={()=>navigate('/Login')}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Wait;