import React, { useState } from 'react';
import iconArrow from '../svg/arrow.svg';

export default function ProjectSmall({ title, image, link }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="project">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div
          className="project__content"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="project__content-image">
            <img
              className="project__image"
              src={isHovered ? image.hovered : image.default}
              alt={title}
            />
          </div>
          <div className="project__description">
            <h3 className="text-h2">{title}</h3>
            <img className="project__icon" src={iconArrow} alt="Arrow" />
          </div>
        </div>
      </a>
    </div>
  );
}
