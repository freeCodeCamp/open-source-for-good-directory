import React from 'react';

const Header = () => (
  <nav className="header">
    <a href="/challenges/next-challenge" className="header-brand">
      <img
        src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg"
        alt="freeCodeCamp logo"
      />
    </a>
    <ul className="header-links">
      <li>
        <a href="https://www.freecodecamp.com">Return to freeCodeCamp.com</a>
      </li>
    </ul>
  </nav>
);

export default Header;
