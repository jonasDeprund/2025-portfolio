import React, { useState } from 'react';
import iconArrow from '../svg/arrow-extern.svg';

export default function ProjectLarge({ title, description, image, link }) {
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
            <div className="project__text">
              <h3 className="text-current color-white">{title}</h3>
              <span className="project__category text-current color-grey-light">
                {description}
              </span>
            </div>
            <img className="project__icon" src={iconArrow} alt="Arrow" />
          </div>
        </div>
      </a>
    </div>
  );
}
