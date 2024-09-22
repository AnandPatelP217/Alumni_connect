import React, { useState, useEffect } from 'react';
import "../../stylesheets/Home/Slider.css";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Function to handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Function to change slide automatically
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []); // Run this effect only once after initial render

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      {images.map((image, index) => (
        <div
          key={index}
          className={index === currentIndex ? 'slide active' : 'slide'}
          style={{ backgroundImage: `url(${image})`, repeat: 'no-repeate', boxFit: 'cover' }}
        ></div>
      ))}
      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default Slider;
