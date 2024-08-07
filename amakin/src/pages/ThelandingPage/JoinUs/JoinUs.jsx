import { useState } from "react";
import axios from "axios";
import AlertModel from "../../../components/alertModel/AlertModel";  // Adjust the import path as necessary
import "./joinUs.css";

const JoinUs = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [trademarkName, setTrademarkName] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const formData = {
      name: userName,
      email: email,
      phone: phone,
      password: password,
      role: "trademark_owner",
      trademark_name: trademarkName,
      img: ''
    };

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/user/create',
        formData,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      const { status } = response;

      if (status === 200) {
        console.log('Registration successful:', response.data);
        setShowModal(true);  // Show the modal
        // Clear the form
        setUserName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setTrademarkName('');
      } else {
        setError('Unexpected status code: ' + status);
        console.log('Unexpected status code:', status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        setError('There was an error registering: ' + (error.response.data.message || error.message));
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('No response received: ' + error.message);
      } else {
        console.error('Error message:', error.message);
        setError('Error: ' + error.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
  };

  return (
    <div className="joinUs">
      <div className="joinUsDesc">
        <img src="../joinUs1.svg" alt="" />
        <div className="text">
          <h1>Do you want to join us</h1>
          <span>Send us your information and the admin will review your order.</span>
          <span>This form is only sent when you want to participate in an event and do not have an account.</span>
          <span>You will receive an email with your login credentials after approval.</span>
        </div>
      </div>
      <div className="joinUsForm">
        <div className="formTitle">
          <span>Fill up the form:</span>
        </div>
        <form className="joinForm" onSubmit={handleSubmit}>
          <div className="formItem">
            <span>User Name</span>
            <div className="inputForm">
              <input
                type="text"
                placeholder="User Name"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="formItem">
            <span>Password</span>
            <div className="inputForm">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="formItem">
            <span>Confirm Password</span>
            <div className="inputForm">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="formItem">
            <span>Phone Number</span>
            <div className="inputForm">
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="formItem">
            <span>Email</span>
            <div className="inputForm">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="formItem">
            <span>Trade Mark Name</span>
            <div className="inputForm">
              <input
                type="text"
                placeholder="Trademark Name"
                required
                value={trademarkName}
                onChange={(e) => setTrademarkName(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="error">{error}</div>}          
          <button type="submit">Send</button>
        </form>
      </div>
      <AlertModel show={showModal} handleClose={handleCloseModal} title="Registration Successful">
        <p>You will receive an email with your login credentials.</p>
      </AlertModel>
    </div>
  );
};

export default JoinUs;
