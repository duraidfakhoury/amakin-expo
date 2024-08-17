import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../../../components/inputField/InputField';
import './transfer.css';  // يمكنك إنشاء ملف CSS للصفحة إذا كنت بحاجة إلى تنسيق الصفحة

const Transfer = () => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleTopUp = async () => {
    setLoading(true);
    setMessage('');
    const formData = {
      email: email,
      amount: amount
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/transfer/create',formData, 
       {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // التحقق من استجابة API
      if (response.data.message === "Your action has been done") {
        setMessage('Account topped up successfully!');
      } else {
        setMessage('Failed to top up account. Please try again.');
      }
    } catch (error) {
      console.error('Error during top-up:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="top-up-container">
      <div className="top-up-wrapper">
        <h2>Top Up Account</h2>
        <InputField
          placeholder='Email'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          placeholder='Amount'
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleTopUp} disabled={loading || !amount || !email}>
          {loading ? 'Processing...' : 'Top Up'}
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Transfer;
