import React from 'react';
import { Carousel } from 'antd';
import '../../stylesheets/Home/TopSlider.css'; // Your custom styles

const TopSlider = () => {
  return (
    <div className="top-slider">
      <Carousel autoplay>
        <div className="slide">
          <img src="'./images/PosterSlider/1home.jpg' " alt="Banner 1" />
        </div>
        <div className="slide">
          <img src="'./images/PosterSlider/1home.jpg' " alt="Banner 2" />
        </div>
        <div className="slide">
          <img src="'./images/PosterSlider/1home.jpg' " alt="Banner 3" />
        </div>
        <div className="slide">
          <img src="'./images/PosterSlider/1home.jpg' " alt="Banner 4" />
        </div>
      </Carousel>
    </div>
  );
};

export default TopSlider;
