import React from 'react';
import './footer.scss';
import twitterLogo from 'src/images/twitter-logo.svg';
import linkedinLogo from 'src/images/linkedin-logo.svg';

const Footer = (): React.ReactElement => {
  return (
    <footer className="footer-container">
      <a href="https://twitter.com/filthycoder" target="_blank" rel="noopener noreferrer">
        <img className="footer-link-image" src={twitterLogo} alt="twitter" />
      </a>
      <a href="https://www.linkedin.com/in/turkaytunc/" target="_blank" rel="noopener noreferrer">
        <img className="footer-link-image" src={linkedinLogo} alt="linkedin" />
      </a>
      <div className="footer-copy"> &copy; {new Date().getFullYear()} Türkay Tunç</div>
    </footer>
  );
};

export default Footer;
