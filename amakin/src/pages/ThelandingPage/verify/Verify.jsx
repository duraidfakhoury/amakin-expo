import React, { useState } from 'react';
import './Verify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate()
  const [loggedData, setLoggedData] = useState();

//   if(loggedData && loggedData.email_verified_at !== null){
//     if(loggedData?.role === 'user'){
//         navigate('/')
//     }else if(loggedData?.role === 'trademark_owner'){
//         navigate('/TmainPage')
//     }else {
//         navigate('/mainPage')
//     }
//   }else{
//     navigate('/Login')
//   }

  const resend = () => {
    axios.get('http://127.0.0.1:8000/api/otp/resend-otp',{
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        } 
    }).catch(() => {
        alert('error otp')
    })
  }

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('otp',otp.join(""))
    axios.post('http://127.0.0.1:8000/api/otp/verify',formData,{
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    }).then(() => {
        if(loggedData.role === 'user'){
            navigate('/')
        }else if(loggedData.role === 'trademark_owner'){
            navigate('/TmainPage')
        }else {
            navigate('/mainPage')
        }
    }).catch(() => {
        alert('error otp')
    })
  };

  return (
    <div className="otp-container">
      <h2>Verify Your Account</h2>
      <p>Please enter the OTP sent to your email.</p>
      <form onSubmit={handleSubmit}>
        <div className="otp-inputs">
          {otp.map((data, index) => (
            <input
              className="otp-field"
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={e => handleChange(e.target, index)}
              onFocus={e => e.target.select()}
            />
          ))}
        </div>
        <button type="submit" className="otp-submit">Submit</button>
        <button className="otp-submit" onClick={resend}>Resend Code</button>
      </form>
    </div>
  );
};

export default Verify;
