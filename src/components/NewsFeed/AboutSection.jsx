import React from 'react';
import './AboutSection.css'; // Import the CSS file for styling
import Header from '../Shared/Header/Header';

const AboutSection = () => {
  return (
    
    <div className="about-container">
         <Header/>
      <div className="sidebar">
        <ul>
          <li className="active">SAGAR GROUP</li>
          <li>VISION & MISSION</li>
          <li>OUR LEADERS</li>
          <li>ADVISORY BOARD</li>
          <li>FACULTIES</li>
        </ul>
      </div>
      <div className="about-content">
        <h1>Sagar Group</h1>
        <p>
          Sagar Group of Institutions, established in 2007 under the aegis of Shri Agrawal Educational & Welfare Society, is committed to imparting quality education. Over the years, the group has grown in size and stature, consistently delivering on its promise of academic excellence.
        </p>
        <button className="explore-button">Explore ➔</button>
      </div>
    </div>
  );
};

export default AboutSection;
