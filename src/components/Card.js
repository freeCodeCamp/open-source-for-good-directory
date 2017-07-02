import React from 'react';
import PropTypes from 'prop-types';

const renderTags = (tags, words) =>
  words.split('').map(index =>
    <p key={tags[index]}>
      {tags[index]}
    </p>
  );

const Card = ({ project, tags, words, icon, isDev }) => {
  if (isDev) {
    return (
      <div className='card'>
        <div className='project-status'>
          <p>
            <i aria-hidden='true' className='fa fa-star fa-fw' />
            &nbsp;{project.stargazer_count}
          </p>
        </div>
        <div className='card-content'>
          <a className='project-link' href='#test'>
            <h1 className='project-title'>
              {project.title}
            </h1>
            <div className='icon-frame'>
              <i aria-hidden='true' className={`fa ${icon} fa-4x`} />
            </div>
            <h3 className='project-desc'>
              {project.description}
            </h3>
          </a>
          <a
            className='demo-link'
            href={`https://github.com/${project.full_name}`}
            >
            See Live Demo
          </a>
        </div>
        <div className='project-tags'>
          {renderTags(tags, words)}
        </div>
      </div>
    );
  }
  return (
    <div className='card'>
      <div className='project-status'>
        <p>
          <i aria-hidden='true' className='fa fa-star fa-fw' />
          &nbsp;{project.stargazer_count}
        </p>
      </div>
      <div className='card-content'>
        <a className='project-link' href='#test'>
          <h1 className='project-title'>
            {project.title}
          </h1>
          <div className='icon-frame'>
            <i aria-hidden='true' className={`fa ${icon} fa-4x`} />
          </div>
          <h3 className='project-desc'>
            {project.description || 'Project missing description'}
          </h3>
        </a>
        <a
          className='demo-link'
          href={`https://github.com/${project.full_name}`}
          >
          See Live Demo
        </a>
      </div>
      <div className='project-tags'>
        {renderTags(tags, words)}
      </div>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.string.isRequired,
  isDev: PropTypes.bool,
  project: PropTypes.objectOf(PropTypes.shape),
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  words: PropTypes.string.isRequired
};

Card.defaultProps = {
  project: {},
  isDev: false
};

export default Card;
