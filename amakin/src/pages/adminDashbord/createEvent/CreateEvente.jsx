import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../../../components/inputField/InputField';
import './createEvent.css';
import AlertModel from '../../../components/alertModel/AlertModel';
import dayjs from 'dayjs';

const CreateEvent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [exhibitionName, setexhibitionName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const formData = {
    name: exhibitionName,
    location: location,
    description: description,
    start_date: startDate ? dayjs(startDate).format('YYYY-MM-DD') : null,
    end_date: endDate ? dayjs(endDate).format('YYYY-MM-DD') : null,
  };

  const handleSubmit = async (exhibition) => {
    exhibition.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/exhibition/create',
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        }
      );

      const { status, data } = response;

      if (status === 200) {
        console.log('exhibition creation successful:', data);
        setShowModal(true);  // Show the modal
        // Clear the form
        setexhibitionName('');
        setLocation('');
        setDescription('');
        setStartDate(null);
        setEndDate(null);
      } else {
        setError('Unexpected status code: ' + status);
        console.log('Unexpected status code:', status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        setError('There was an error creating the exhibition: ' + (error.response.data.message || error.message));
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
    <div className='createexhibition'>
      <div className="createDesc">
        <img src="../undraw_building_blocks_re_5ahy.svg" alt="" />
        <div className="text">
          <h1>Create an exhibition</h1>
          <span>Add the basic information of the exhibition in this form </span>
          <span>You can specify more detals for the exhibition int exhibition details page once you create it.</span>
          <span>Make sure you fill it up with the right data.</span>
        </div>
      </div>
      <div className="createForm">
        <span className="Etitle">Fill Up The Information.</span>
        <form className='exhibitionForm' onSubmit={handleSubmit}>
          <div className="EFormItem">
            <InputField 
              placeholder='exhibition Name'
              type='text'
              value={exhibitionName}
              onChange={(e) => setexhibitionName(e.target.value)}
            />
          </div>
          <div className="EFormItem">
            <InputField 
              placeholder='Location'
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="EFormItem">
            <InputField 
              placeholder='Description'
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="EFormItem">
            <InputField 
              placeholder='Start Date'
              type='date'
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </div>
          <div className="EFormItem">
            <InputField 
              placeholder='End Date'
              type='date'
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type='submit'>Create</button>
        </form>
      </div>
      <AlertModel show={showModal} handleClose={handleCloseModal} title="exhibition Created sucsesfully">
        <p>You can specify more details to your exhibition through the dashBoard.</p>
      </AlertModel>
      
    </div>
  );
};

export default CreateEvent;
