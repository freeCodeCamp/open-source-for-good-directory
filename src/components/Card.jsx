import React from 'react';
import PropTypes from 'prop-types';

const renderTags = (tags, words) => (
  words.split('').map(index => (
    <p>{tags[index]}</p>
  ))
);

const Card = ({ project, tags, words }) => (
  <div className="card">
    <div className="card-content">
      <div className="project-status">
        <p><i className="fa fa-eye fa-fw" aria-hidden="true" />&nbsp;0</p>
        <p><i className="fa fa-star fa-fw" aria-hidden="true" />&nbsp;{ project.stargazer_count }</p>
      </div>
      <a className="project-link" href="#test">
        <h1 className="project-title">{ project.title }</h1>
        <div className="icon-frame">
          <i className="fa fa-envelope-open-o fa-4x" aria-hidden="true" />
        </div>
        <h3 className="project-desc">{ project.description }</h3>
      </a>
      <a className="demo-link" href={`https://github.com/${project.full_name}`}>See Live Demo</a>
    </div>
    <div className="project-tags">
      {renderTags(tags, words)}
    </div>
  </div>
);

Card.propTypes = {
  project: PropTypes.objectOf(PropTypes.shape),
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  words: PropTypes.string.isRequired,
};

Card.defaultProps = {
  project: {},
  isDev: false,
};

export default Card;
