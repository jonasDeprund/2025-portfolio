import React from 'react';
import logo from '../svg/logo.svg';

function Nav() {
  return (
    <nav className="navigation">
      <ul className="row">
        <div className="navigation__item cell-start-0 cell-end-12">
          <li>
            <a className="logo" href="/">
              <img src={logo} alt="logo" />
            </a>
          </li>
          <li>
            <a
              className="contact button text-button"
              href="mailto:jonasdeprund@gmail.com"
            >
              Contact
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
