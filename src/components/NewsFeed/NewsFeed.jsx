import React, { useState } from 'react';
import alumniData from '../../APIs/alumniData.json'; // Assuming you have this file
import "../../stylesheets/AlumniNewsFeed/AlumniNewsFeed.css";

const NewsFeed = () => {
  const [news] = useState(alumniData);

  return (
    <div className="alumni-news-feed">
      <h2>Alumni News</h2>
      
      <div className="alumni-news-list">
        {news.map((item, index) => (
          <div className="alumni-news-item" key={index}>
            <img src={item.urlToImage} alt={item.title} className="alumni-news-image" />
            <div className="alumni-news-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
