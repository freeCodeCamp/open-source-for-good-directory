import React from 'react';

const Testimonial = () =>
  (<div>
    <div className='as-seen-on'>
      <h3 className='as-seen-on-desc'>As seen on...</h3>
      <img
        alt='freeCodeCamp has been featured on these publications'
        src='https://s3.amazonaws.com/freecodecamp/as-seen-on.png'
      />
    </div>
    <hr className='break' />
    <div className='testimonals-container'>
      <div className='testimonal'>
        <img alt="Ewa's testimonal" src='https://i.imgur.com/ZHnFFN5.jpg' />
        <p>
          With Free Code Camp&#39;s valuable contribution, we were able to
          improve all of our systems and processes as part of our Wonder Women
          Eastern Indonesia program, and make sure that even more life changing
          technologies get to where they are needed most.
        </p>
        <p>
          Ewa Wojkowska - <em>Kopernik</em>
        </p>
      </div>
      <div className='testimonal'>
        <img
          alt="Jennifer's testimonal"
          src='https://i.imgur.com/KHF8O2i.jpg'
        />
        <p>
          We have been blown away by the professional quality of the work that
          has been produced by the campers working on our projects. Free Code
          Camp has been an invaluable partner and we are grateful for their
          support.
        </p>
        <p>
          Jennifer McDowell - <em>Child First Authority</em>
        </p>
      </div>
      <div className='testimonal'>
        <img
          alt="Jennifer's testimonal"
          src='https://i.imgur.com/9VknVe3.jpg'
        />
        <p>
          We had the pleasure to work with two very talented campers who went
          above and beyond to create a web-based app for us. I would highly
          recommend that nonprofits apply to Free Code Camp with their custom
          solution needs!
        </p>
        <p>
          Stephanie McAllister - <em>Timeraiser</em>
        </p>
      </div>
    </div>
  </div>);

export default Testimonial;
