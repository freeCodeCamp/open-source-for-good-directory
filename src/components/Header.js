import React from 'react';
import logo from '../assets/fcc-logo-white.png';

const Header = () =>
  <nav className='header'>
    <a className='header-brand' href='https://www.freecodecamp.org/'>
      <img alt='freeCodeCamp logo' src={logo} />
      <i
        aria-hidden='true'
        className='header-logo fa fa-free-code-camp fa-2x'
      />
    </a>
    <ul className='header-links'>
      <li>
        <a href='https://www.freecodecamp.org/donate' target='_blank'>
          Donate
        </a>
      </li>
      <li>
        <a href='https://www.freecodecamp.org/'>Return to freeCodeCamp.org</a>
      </li>
    </ul>
    <a
      href='https://www.freecodecamp.org/donate'
      id='donate-icon'
      target='_blank'
      >
      <i aria-hidden='true' className='fa fa-heart' />
    </a>
  </nav>;

export default Header;
