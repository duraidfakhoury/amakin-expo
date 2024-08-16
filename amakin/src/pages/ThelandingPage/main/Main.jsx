import React from 'react';
import './main.css';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className='main'>
      {/* Hero Section */}
      <section id="hero">
        <h1>Welcome to Amaken Expo</h1>
        <p>Your go-to place for organizing exhibitions and exhibitions.</p>
      </section>

      {/* Services Section */}
      <section id="services">
        <h2>Our Services</h2>
        <div className="services-cards">
          <div className="card">
            <h3>exhibition Organization</h3>
            <p>We organize top-tier exhibitions and exhibitions.</p>
          </div>
          <div className="card">
            <h3>Participation Management</h3>
            <p>Seamless participant management and coordination.</p>
          </div>
          <div className="card">
            <h3>Online Platforms</h3>
            <p>Providing robust online participation platforms.</p>
          </div>
        </div>
      </section>

      {/* Upcoming exhibitions Section */}
      <section id="exhibitions">
        <h2>Upcoming exhibitions</h2>
        <div className="exhibition-list">
          <div className="exhibition-item">
            <h3>exhibition 1</h3>
            <p>Date: 10th October 2024</p>
          </div>
          <div className="exhibition-item">
            <h3>exhibition 2</h3>
            <p>Date: 20th November 2024</p>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section id="download-app">
        <h2>Get Our Mobile App</h2>
        <p>For the best experience, download our mobile app and stay connected with the latest exhibitions.</p>
        <button>Download for iOS</button>
        <button>Download for Android</button>
      </section>

      {/* Join Us Section */}
      <section id="join-us">
        <h2>Want to Participate?</h2>
        <p>If you're interested in participating in our exhibitions, please visit our Join Us page.</p>
        <button onClick={()=>navigate(('/JoinUs'))}>Join Us</button>
      </section>
    </div>
  );
};

export default Main;
