import React from 'react';
import { Carousel } from 'antd';
import './PosterSlider.css'; // Optional: For additional custom styles

const images = [
  './images/PosterSlider/1home.jpg',
  './images/PosterSlider/2home.jpg',
  './images/PosterSlider/3home.jpg',
  './images/PosterSlider/4home.jpg',
  './images/PosterSlider/5home.jpg',
  './images/PosterSlider/6home.jpg',
];

const PosterSlider = () => {
  return (
    <div className="poster-slider">
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} className="slider-image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PosterSlider;
