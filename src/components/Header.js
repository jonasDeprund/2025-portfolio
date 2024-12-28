import React from 'react';

function Header() {
  return (
    <div className="header">
      <div className="row">
        <div className="header__title text-selectable cell-start-0 cell-end-8 cell-start-0-m cell-end-12-m">
          <h1 className="text-h1 text-h1-m">
            Hello, I’m a designer based in Paris.I create user-focused
            interfaces and digital experiences.
          </h1>
        </div>
        <div className="header__scroll cell-start-0 cell-end-12">
          <span className="text-caption">↓ Scroll down</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
