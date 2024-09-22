import React, { useState } from 'react';
import "../../stylesheets/Home/ThreeBox.css";

const Card = ({ name, title, image }) => (
  <div className="card">
    <img src={image} alt={name} />
    <h2>{name}</h2>
    <p>{title}</p>
  </div>
);

function ThreeBox() {
  const [startIndex, setStartIndex] = useState(0);

  const people = [
    { name: 'Mr. Anand Patel', title: '$20+ LPA Annually', image: './images/PlacedStudents/anand1.jpg' },
    { name: 'Mr. Anand Patel', title: '$20+ LPA Annually', image: './images/anand1.jpg' },
    { name: 'Mr. Anand Patel', title: '$20+ LPA Annually', image: './images/anand1.jpg' },
    { name: 'Mr. Anand Patel', title: '$20+ LPA Annually', image: './images/PlacedStudents/anand1.jpg' },
    { name: 'Mr. Anand Patel', title: '$20+ LPA Annually', image: './images/PlacedStudents/anand1.jpg' },
    { name: 'Mr. Anand Patel', title: '$20+ LPA Annually', image: './images/PlacedStudents/anand1.jpg' },
  ];

  const handleNext = () => {
    if (startIndex < people.length - 3) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className='placed-alumni-container'>
      <div className='centerdiv'>
        <h1>PLACED ALUMNI</h1>
        <hr />
      </div>

      <div className="card-container">
        <button onClick={handlePrevious} disabled={startIndex === 0} className="nav-button">
          Previous
        </button>
        <div className="card-wrapper">
          {people.slice(startIndex, startIndex + 3).map((person, index) => (
            <Card key={startIndex + index} {...person} />
          ))}
        </div>
        <button onClick={handleNext} disabled={startIndex === people.length - 3} className="nav-button">
          Next
        </button>
      </div>
    </div>
  );
}

export default ThreeBox;
