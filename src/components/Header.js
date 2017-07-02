import React from 'react';
import logo from '../assets/fcc-logo-white.png';

const Header = () =>
  <nav className='header'>
    <a className='header-brand' href='https://www.freecodecamp.com/'>
      <img alt='freeCodeCamp logo' src={logo} />
      <i
        aria-hidden='true'
        className='header-logo fa fa-free-code-camp fa-2x'
      />
    </a>
    <ul className='header-links'>
      <li>
        <a href='https://www.freecodecamp.com/'>Return to freeCodeCamp.com</a>
      </li>
    </ul>
  </nav>;

export default Header;
