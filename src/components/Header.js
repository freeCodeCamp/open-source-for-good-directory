import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/fcc-logo-white.png';

const Header = ({ isDev }) =>
  (<nav className='header'>
    <a className='header-brand' href='https://www.freecodecamp.org/'>
      <img alt='freeCodeCamp logo' src={logo} />
      <i
        aria-hidden='true'
        className='header-logo fa fa-free-code-camp fa-2x'
      />
    </a>
    <ul className='header-links'>
      {isDev
        ? <li id='header-camper' title='Welcome Camper'>
            <a>
              <i aria-hidden='true' className='fa fa-user-circle' />
            </a>
          </li>
        : <li />}
      <li title='Donate'>
        <a
          href='https://www.freecodecamp.org/donate'
          rel='noopener noreferrer'
          target='_blank'
          >
          Donate
        </a>
      </li>
      <li title='return to freeCodeCamp.org'>
        <a href='https://www.freecodecamp.org/'>Return to freeCodeCamp.org</a>
      </li>
      <li>
        <a
          href='https://www.freecodecamp.org/donate'
          id='donate-icon'
          rel='noopener noreferrer'
          target='_blank'
          >
          <i aria-hidden='true' className='fa fa-heart' />
        </a>
      </li>
    </ul>
  </nav>);

Header.propTypes = {
  isDev: PropTypes.bool
};

export default Header;
