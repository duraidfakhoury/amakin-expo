import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../../../components/inputField/InputField';
import './createEvent.css';
import AlertModel from '../../../components/alertModel/AlertModel';
import dayjs from 'dayjs';

const CreateEvent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const formData = {
    name: eventName,
    location: location,
    description: description,
    start_date: startDate ? dayjs(startDate).format('YYYY-MM-DD') : null,
    end_date: endDate ? dayjs(endDate).format('YYYY-MM-DD') : null,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/event/create',
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
        console.log('Event creation successful:', data);
        setResponseData(data);
        setShowModal(true);  // Show the modal
        // Clear the form
        setEventName('');
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
        setError('There was an error creating the event: ' + (error.response.data.message || error.message));
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
    <div className='createEvent'>
      <div className="createDesc">Create an Event</div>
      <div className="createForm">
        <span className="Etitle">Fill Up The Information.</span>
        <form className='eventForm' onSubmit={handleSubmit}>
          <div className="EFormItem">
            <InputField 
              placeholder='Event Name'
              type='text'
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
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
      <AlertModel show={showModal} handleClose={handleCloseModal} title="Event Created sucsesfully">
        <p>You can specify more details to your Event through the dashBoard.</p>
      </AlertModel>
      
    </div>
  );
};

export default CreateEvent;
