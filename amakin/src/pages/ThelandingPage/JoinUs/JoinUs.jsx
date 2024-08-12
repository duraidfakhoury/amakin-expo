import { useState } from "react";
import axios from "axios";
import AlertModel from "../../../components/alertModel/AlertModel";  // Adjust the import path as necessary
import "./joinUs.css";
import InputField from "../../../components/inputField/InputField";

const JoinUs = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [trademarkName, setTrademarkName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setFileName(file ? file.name : '');
  };

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
      image:imageFile 
    };

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/user/create',
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',  // Ensure correct header for file uploads
          },
        }
      );

      if (response.status === 200) {
        setShowModal(true);
        setUserName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setTrademarkName('');
        setImageFile(null);
        setFileName('');
      } else {
        setError('Unexpected status code: ' + response.status);
      }
    } catch (error) {
      if (error.response) {
        setError('There was an error registering: ' + (error.response.data.message || error.message));
      } else if (error.request) {
        setError('No response received: ' + error.message);
      } else {
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
            <InputField
            placeholder='User Name'
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="formItem">
            <InputField
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formItem">
            <InputField
            placeholder='Confirm Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="formItem">
            <InputField
            placeholder='Phone Number'
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="formItem">
            <InputField
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="formItem">
            <InputField
            placeholder='Trade Mark Name'
            type="text"
            value={trademarkName}
            onChange={(e) => setTrademarkName(e.target.value)}
            />
          </div>
          <div className="formItem">
            <input
              type="file"
              id="image"
              name="img"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image" className="custom-file-upload">
              Choose Image
            </label>
            {fileName && (
              <span className="file-name">{fileName}</span>
            )}
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
