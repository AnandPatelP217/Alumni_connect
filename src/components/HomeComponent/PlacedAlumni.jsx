import React from "react";
import "../../stylesheets/homeStylesheets/Gallery.css";
import { Image } from "antd";
import { sliderSettings } from "../../utils/common.js";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

// Explicitly import images
import image1 from "../../Images/gallery/1.jpg";
import image2 from "../../Images/gallery/2.jpg";
import image3 from "../../Images/gallery/3.jpg";
import image4 from "../../Images/gallery/4.jpg";
import image5 from "../../Images/gallery/5.jpg";
import image6 from "../../Images/gallery/6.jpg";
import image7 from "../../Images/gallery/7.jpg";
import image8 from "../../Images/gallery/8.jpg";
import image9 from "../../Images/gallery/9.jpg";
import image10 from "../../Images/gallery/10.jpg";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

const Gallery = () => {
  return (
    <section className="gallery">
      <div className="text-center mb-4">
        <div className="section-title mb-3">
          <h2>Placed Alumni</h2>
          <p style={{ color: "var(--textLight)" }}>
            These are the photos of our Placed Alumni with Highest Pakage{" "}
          </p>
        </div>
      </div>

      <div className="paddings innerWidth">
        <Swiper {...sliderSettings}>
          {/* Slider buttons */}
          <SliderButtons />

          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="flexColCenter gallery-item">
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-100 gallery-slider"
                  fallback="https://via.placeholder.com/150" // Fallback image
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;

// Slider buttons component
const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="slider-button">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
