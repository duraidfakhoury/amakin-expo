import { useState } from "react";
import axios from "axios";
import AlertModel from "../../../components/alertModel/AlertModel";  // Adjust the import path as necessary
import "./signUp.css";
import InputField from "../../../components/inputField/InputField";

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
 
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
      role: "admin",
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
    <div className="signUp">
      <div className="signUpDesc">
        <img src="../addAdmin.svg" alt="" />
        <div className="text">
          <h1>Add Another Admin </h1>
          <span>By sending this form tour going to create an admin.</span>
          <span>Keep in mind the login cridentials,you are going to need them.</span>
          <span>You will receive an email with your login credentials after approval.</span>
        </div>
      </div>
      <div className="signUpForm">
        <div className="formTitle">
          <span>Fill up the form:</span>
        </div>
        <form className="signForm" onSubmit={handleSubmit}>
          <div className="signformItem">
            <InputField
            placeholder='User Name'
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="signformItem">
            <InputField
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signformItem">
            <InputField
            placeholder='Confirm Paaword'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="signformItem">
            <InputField
            placeholder='Phone Number'
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="signformItem">
            <InputField
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signformItem">
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
        <p>You will receive an email After the admin aprove you.</p>
      </AlertModel>
    </div>
  );
};

export default SignUp;
