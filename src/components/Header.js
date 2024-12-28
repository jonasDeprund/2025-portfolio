import React from 'react';

function Header() {
  return (
    <div className="header">
      {/* text */}
      <div className="row">
        <div className="header__title text-selectable cell-start-0 cell-end-12 cell-start-0-m cell-end-12-m">
          <h1 className="text-h1 text-h1-m ">
            Hello,
            <br></br>I am an interactive designer based in Paris.
            <br></br>I craft identities and websites.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
