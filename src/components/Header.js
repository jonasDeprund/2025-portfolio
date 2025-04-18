import React from 'react';
import iconArrowDown from '../svg/arrow-down.svg';

function Header() {
  return (
    <div className="header">
      <div className="row">
        <div className="header__title cell-start-0 cell-end-8 cell-start-0-m cell-end-12-m">
          <h1 className="text-h1" style={{ userSelect: 'none' }}>
            Hello, I'm a designer based in Paris.I create user-focused
            interfaces and digital experiences.
          </h1>
        </div>
        <div className="header__scroll cell-start-0 cell-end-12">
          <img className="icon-arrow-down" src={iconArrowDown} alt="Arrow" />
          <span className="text-caption">Scroll down</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
