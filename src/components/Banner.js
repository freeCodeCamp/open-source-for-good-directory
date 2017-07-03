import React from 'react';

const Banner = () =>
  <div>
    <h1 className='main-title'>Open Source for Good</h1>
    <h3 className='main-desc'>
      Free High-Quality Software Tools for Non-Profits
    </h3>
    <div className='as-seen-on'>
      <h3 className='as-seen-on-desc'>As seen on...</h3>
      <img
        alt='freeCodeCamp has been featured on these publications'
        src='https://s3.amazonaws.com/freecodecamp/as-seen-on.png'
      />
    </div>
    <hr className='break' />
  </div>;

export default Banner;
