import React from 'react';
import iconBehance from '../svg/behance.svg';
import iconDribbble from '../svg/dribbble.svg';
import iconGithub from '../svg/github.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="row">
          <div className="cell-6 cell-12-tp">
            <div className="social-container">
              <p className="text-current color-white">Follow me</p>
              <a
                rel="noreferrer"
                className="icon"
                href="https://www.behance.net/jonasdeprund"
                target="_blank"
              >
                <img src={iconBehance} alt={iconBehance} />
              </a>
              <a
                rel="noreferrer"
                className="icon"
                href="https://dribbble.com/jonasdeprund"
                target="_blank"
              >
                <img src={iconDribbble} alt={iconDribbble} />
              </a>
              <a
                rel="noreferrer"
                className="icon"
                href="https://github.com/jonasDeprund"
                target="_blank"
              >
                <img src={iconGithub} alt={iconGithub} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
