import React from 'react';

import iconArrowRight from '../svg/arrow-right.svg';

function Nav() {
  return (
    <nav className="navigation">
      <ul className="row">
        <div className="navigation__item cell-start-0 cell-end-12">
          <li className="">
            <a className="text-h2 text-h2-m" href="index.html">
              Jonas Deprund
            </a>
          </li>
          <li className="">
            <a
              className="contact button text-button"
              href="mailto:jonasdeprund@gmail.com"
            >
              <span>Contact</span>
              <img className="button__icon" src={iconArrowRight} alt="Arrow" />
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
