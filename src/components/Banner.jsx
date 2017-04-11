import React from 'react';

const Banner = () => (
  <div>
    <h1 className="main-title">Open Source for Good</h1>
    <h3 className="main-desc">Our mission is to provide free high-quality software to non-profits</h3>
    <div className="as-seen-on">
      <h3 className="as-seen-on-desc">As seen on...</h3>
      <img
        src="https://s3.amazonaws.com/freecodecamp/as-seen-on.png"
        alt="freeCodeCamp has been featured on these publications"
      />
    </div>
    <hr className="break" />
  </div>
);

export default Banner;
