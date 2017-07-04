import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ description, icon, link, name, stars, tags, title }) => {
  const tagsArray = tags.map(tag =>
    <p key={`${name}-${tag}`}>
      {tag}
    </p>
  );
  return (
    <div className='card'>
      <div className='project-status'>
        <p>
          <i aria-hidden='true' className='fa fa-star fa-fw' />
          {stars}
        </p>
      </div>
      <div className='card-content'>
        <a className='project-link' href='#test'>
          <h1 className='project-title'>
            {title}
          </h1>
          <div className='icon-frame'>
            <i aria-hidden='true' className={`fa ${icon} fa-4x`} />
          </div>
          <h3 className='project-desc'>
            {description}
          </h3>
        </a>
        <a
          className='demo-link'
          href={link}
          target='_blank'
          >
          See Public Repo
        </a>
      </div>
      <div className='project-tags'>
        {tagsArray}
      </div>
    </div>
  );
};

Card.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  stars: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string
};

export default Card;
