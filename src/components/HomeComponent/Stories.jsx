import React, { useEffect, useState } from 'react';
import storiesData from '../../APIs/storiesData.json'; // Importing the local JSON file
import './AlumniStory.css'; // CSS file for styling

const AlumniStory = () => {
  const [currentAlumIndex, setCurrentAlumIndex] = useState(0); // State to track the current index
  const totalAlumni = storiesData.length;

  // Function to handle manual slide change
  const handleNext = () => {
    setCurrentAlumIndex((prevIndex) => (prevIndex + 1) % totalAlumni);
  };

  const handlePrev = () => {
    setCurrentAlumIndex((prevIndex) =>
      prevIndex === 0 ? totalAlumni - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Automatically change the slide every 2 seconds
    }, 2000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const currentAlum = storiesData[currentAlumIndex]; // Get the current alumnus data

  return (
    <div className="alumni-container">
      <div className="alumni-card">
        <div className="alumni-info">
          <h2>{currentAlum.name}</h2>
          <p>{currentAlum.bio}</p>
          <p><strong>Graduation Year: </strong>{currentAlum.graduationYear}</p>
          <p><strong>Profession: </strong>{currentAlum.profession}</p>
        </div>
        <div className="alumni-image">
          <img src={currentAlum.image} alt={currentAlum.name} />
        </div>
      </div>

      {/* Custom Navigation Buttons */}
      <div className="navigation-buttons">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default AlumniStory;
